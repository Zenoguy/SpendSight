import React, { useState, useCallback } from 'react';
import { Tier, UploadedFile, Transaction } from '../types';
import { mockTransactions } from '../data/mockData';
import {
  Upload, FileText, Loader2, Download,
  CheckCircle, AlertCircle, Layers3
} from 'lucide-react';

interface UploadStatementProps {
  selectedTier: Tier;
}

export const UploadStatement: React.FC<UploadStatementProps> = ({ selectedTier }) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isParsingAll, setIsParsingAll] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [mergedTransactions, setMergedTransactions] = useState<Transaction[] | null>(null);

  const getUploadLimit = () => {
    switch (selectedTier) {
      case 'free': return 1;
      case 'smart': return 10;
      case 'business': return Infinity;
      default: return 1;
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [uploadedFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const limit = getUploadLimit();
    const currentCount = uploadedFiles.length;
    const availableSlots = limit === Infinity ? files.length : Math.max(0, limit - currentCount);

    if (availableSlots === 0) {
      alert(`Upload limit reached for ${selectedTier} tier`);
      return;
    }

    const filesToAdd = files.slice(0, availableSlots).filter(file =>
      file.type === 'application/pdf' || file.name.endsWith('.pdf')
    );

    const newFiles: UploadedFile[] = filesToAdd.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'uploaded'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const parseStatements = async () => {
    setIsParsingAll(true);

    for (let i = 0; i < uploadedFiles.length; i++) {
      if (uploadedFiles[i].status === 'uploaded') {
        setUploadedFiles(prev =>
          prev.map((file, index) => index === i ? { ...file, status: 'parsing' } : file)
        );

        await new Promise(resolve => setTimeout(resolve, 1000));

        setUploadedFiles(prev =>
          prev.map((file, index) => index === i ? { ...file, status: 'parsed' } : file)
        );
      }
    }

    setIsParsingAll(false);
    setShowPreview(true);
  };

  const mergeStatements = () => {
    // Simulate merging all parsed files' mock data
    if (uploadedFiles.every(file => file.status === 'parsed')) {
      const merged = Array(uploadedFiles.length)
        .fill(null)
        .flatMap(() => mockTransactions);

      setMergedTransactions(merged);
    }
  };

  const downloadCSV = () => {
    const data = mergedTransactions || mockTransactions;

    const csvContent = [
      ['Date', 'Description', 'Amount', 'Category', 'Vendor'],
      ...data.map(t => [t.date, t.description, t.amount.toString(), t.category, t.vendor])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: UploadedFile['status']) => {
    switch (status) {
      case 'uploaded':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'parsing':
        return <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'parsed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const canUploadMore = uploadedFiles.length < getUploadLimit();
  const hasUploadedFiles = uploadedFiles.length > 0;
  const canParse = uploadedFiles.some(file => file.status === 'uploaded');
  const allParsed = uploadedFiles.length > 0 && uploadedFiles.every(file => file.status === 'parsed');

  return (
    <div className="p-6 space-y-6 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Upload Financial Statements</h2>

        {canUploadMore && (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Drop your PDF statements here
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              or click to browse files
            </p>
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
            >
              Choose Files
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {selectedTier === 'business'
                ? 'Unlimited uploads'
                : `${getUploadLimit() - uploadedFiles.length} uploads remaining`}
            </p>
          </div>
        )}

        {hasUploadedFiles && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(file.status)}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    file.status === 'uploaded' ? 'bg-blue-100 text-blue-800' :
                    file.status === 'parsing' ? 'bg-yellow-100 text-yellow-800' :
                    file.status === 'parsed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>

            {canParse && (
              <button
                onClick={parseStatements}
                disabled={isParsingAll}
                className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isParsingAll ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Parsing Statements...</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Parse Statements</span>
                  </>
                )}
              </button>
            )}

            {allParsed && selectedTier === 'business' && (
              <button
                onClick={mergeStatements}
                className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Layers3 className="w-4 h-4" />
                <span>Merge & View Consolidated</span>
              </button>
            )}
          </div>
        )}
      </div>

      {showPreview && allParsed && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {mergedTransactions ? 'Consolidated Transactions' : 'Extracted Transactions'}
            </h3>
            <button
              onClick={downloadCSV}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {['Date', 'Description', 'Amount', 'Category', 'Vendor'].map(col => (
                    <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {(mergedTransactions || mockTransactions).slice(0, 20).map((t, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {t.description}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                      t.amount < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ${Math.abs(t.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {t.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {t.vendor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
