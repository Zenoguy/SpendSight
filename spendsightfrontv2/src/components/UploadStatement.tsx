import React, { useState, useCallback } from 'react';
import { Tier, UploadedFile, Transaction } from '../types';
import { mockTransactions } from '../data/mockData';
import {
  Upload, FileText, Loader2, Download, Database,
  CheckCircle, AlertCircle, Layers3, Receipt, FileSpreadsheet
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
  const [activeSection, setActiveSection] = useState<'bills' | 'records'>('bills');

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

    const allowedTypes = activeSection === 'bills' 
      ? ['application/pdf', '.pdf']
      : ['text/csv', '.csv', 'application/vnd.ms-excel', '.xls', '.xlsx'];

    const filesToAdd = files.slice(0, availableSlots).filter(file => {
      if (activeSection === 'bills') {
        return file.type === 'application/pdf' || file.name.endsWith('.pdf');
      } else {
        return file.type === 'text/csv' || file.name.endsWith('.csv') || 
               file.type.includes('excel') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx');
      }
    });

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
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'parsing':
        return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />;
      case 'parsed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
    }
  };

  const canUploadMore = uploadedFiles.length < getUploadLimit();
  const hasUploadedFiles = uploadedFiles.length > 0;
  const canParse = uploadedFiles.some(file => file.status === 'uploaded');
  const allParsed = uploadedFiles.length > 0 && uploadedFiles.every(file => file.status === 'parsed');

  const SectionButton = ({ section, icon: Icon, title, description }: any) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`
        relative group p-6 rounded-3xl transition-all duration-300 text-left w-full
        ${activeSection === section 
          ? 'glass glow-purple border border-purple-500/50' 
          : 'glass border border-white/20 hover:border-white/30'
        }
      `}
    >
      {activeSection === section && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-3xl blur-xl"></div>
      )}
      <div className="relative flex items-center space-x-4">
        <div className={`p-3 glass rounded-2xl ${activeSection === section ? 'glow-purple' : ''}`}>
          <Icon className={`w-6 h-6 ${activeSection === section ? 'text-purple-400' : 'text-gray-400'}`} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${activeSection === section ? 'text-white' : 'text-gray-300'}`}>
            {title}
          </h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="p-6 space-y-8 pb-24 lg:pb-6">
      {/* Section Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionButton
          section="bills"
          icon={Receipt}
          title="Upload Bills"
          description="Upload your Bills for analysis and categorization"
        />
        <SectionButton
          section="records"
          icon={Database}
          title="Import Existing Records"
          description="Upload PDF bank statements or CSV/Excel files with existing transaction data"
        />
      </div>

      {/* Upload Area */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative glass rounded-3xl p-6 soft-shadow border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 glass rounded-xl">
              {activeSection === 'bills' ? (
                <Receipt className="w-5 h-5 text-purple-400" />
              ) : (
                <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
              )}
            </div>
            <h2 className="text-xl font-semibold text-white">
              {activeSection === 'bills' ? 'Upload Bills' : 'Import Transaction Records'}
            </h2>
          </div>

          {canUploadMore && (
            <div
              className={`
                border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300
                ${isDragOver
                  ? 'border-purple-500 bg-purple-500/10 glow-purple'
                  : 'border-white/30 hover:border-white/50'
                }
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="p-4 glass rounded-2xl w-fit mx-auto mb-4">
                <Upload className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                Drop your {activeSection === 'bills' ? 'Bills photos' : 'CSV/Excel files'} here
              </h3>
              <p className="text-gray-300 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                multiple
                accept={activeSection === 'bills' ? '.pdf' : '.csv,.xls,.xlsx'}
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-6 py-3 gradient-button text-white rounded-2xl hover:gradient-button-hover cursor-pointer transition-all duration-300 font-medium soft-shadow hover:glow-purple"
              >
                Choose Files
              </label>
              <p className="text-sm text-gray-400 mt-4">
                {selectedTier === 'business'
                  ? 'Unlimited uploads'
                  : `${getUploadLimit() - uploadedFiles.length} uploads remaining`}
              </p>
            </div>
          )}

          {hasUploadedFiles && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                Uploaded Files
              </h3>
              <div className="space-y-3">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                    <div className="relative flex items-center justify-between p-4 glass rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(file.status)}
                        <div>
                          <p className="font-medium text-white">{file.name}</p>
                          <p className="text-sm text-gray-400">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        file.status === 'uploaded' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        file.status === 'parsing' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                        file.status === 'parsed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        'bg-red-500/20 text-red-400 border-red-500/30'
                      }`}>
                        {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                {canParse && (
                  <button
                    onClick={parseStatements}
                    disabled={isParsingAll}
                    className="flex items-center justify-center space-x-2 px-6 py-3 gradient-button text-white rounded-2xl hover:gradient-button-hover disabled:opacity-50 transition-all duration-300 font-medium soft-shadow hover:glow-purple"
                  >
                    {isParsingAll ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        <span>{activeSection === 'bills' ? 'Parse Statements' : 'Process Records'}</span>
                      </>
                    )}
                  </button>
                )}

                {allParsed && selectedTier === 'business' && (
                  <button
                    onClick={mergeStatements}
                    className="flex items-center justify-center space-x-2 px-6 py-3 glass text-white rounded-2xl hover:glow-cyan transition-all duration-300 font-medium border border-white/20"
                  >
                    <Layers3 className="w-4 h-4" />
                    <span>Merge & View Consolidated</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {showPreview && allParsed && (
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative glass rounded-3xl p-6 soft-shadow border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                {mergedTransactions ? 'Consolidated Transactions' : 'Extracted Transactions'}
              </h3>
              <button
                onClick={downloadCSV}
                className="flex items-center space-x-2 px-4 py-2 glass text-white rounded-2xl hover:glow-green transition-all duration-300 font-medium border border-white/20"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto custom-scrollbar rounded-2xl">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    {['Date', 'Description', 'Amount', 'Category', 'Vendor'].map(col => (
                      <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {(mergedTransactions || mockTransactions).slice(0, 20).map((t, index) => (
                    <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {new Date(t.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {t.description}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                        t.amount < 0 ? 'text-red-400' : 'text-green-400'
                      }`}>
                        ${Math.abs(t.amount).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {t.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {t.vendor}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};