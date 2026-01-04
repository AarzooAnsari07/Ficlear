import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Database, Upload, Download, RefreshCw, Check, AlertCircle, FileText, Building2 } from 'lucide-react';
import { initializeDatabase, companiesAPI, pincodesAPI, banksAPI, offersAPI } from '../../utils/database';
import { projectId, publicAnonKey } from '../../../../utils/supabase/info';

export function DatabaseSettings() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [stats, setStats] = useState({
    companies: 0,
    pincodes: 0,
    banks: 0,
    offers: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  
  // PIN Code Upload State
  const [isUploadingPincode, setIsUploadingPincode] = useState(false);
  const [pincodeUploadStatus, setPincodeUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pincodeUploadMessage, setPincodeUploadMessage] = useState('');
  const [pincodeUploadProgress, setPincodeUploadProgress] = useState(0);
  const [pincodeTotalRecords, setPincodeTotalRecords] = useState(0);
  
  // Company Upload State
  const [isUploadingCompany, setIsUploadingCompany] = useState(false);
  const [companyUploadStatus, setCompanyUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [companyUploadMessage, setCompanyUploadMessage] = useState('');
  const [companyUploadProgress, setCompanyUploadProgress] = useState(0);
  const [companyTotalRecords, setCompanyTotalRecords] = useState(0);

  const handleInitialize = async () => {
    setIsInitializing(true);
    setInitStatus('idle');
    
    try {
      const result = await initializeDatabase();
      if (result.success) {
        setInitStatus('success');
        await loadStats();
      } else {
        setInitStatus('error');
      }
    } catch (error) {
      console.error('Initialization error:', error);
      setInitStatus('error');
    } finally {
      setIsInitializing(false);
    }
  };

  const loadStats = async () => {
    setIsLoadingStats(true);
    try {
      const [companiesRes, pincodesRes, banksRes, offersRes] = await Promise.all([
        companiesAPI.getAll(),
        pincodesAPI.getAll(),
        banksAPI.getAll(),
        offersAPI.getAll(),
      ]);

      setStats({
        companies: companiesRes.data?.length || 0,
        pincodes: pincodesRes.data?.length || 0,
        banks: banksRes.data?.length || 0,
        offers: offersRes.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  };
  
  // Parse CSV file
  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
      // Handle CSV with quoted values
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index] || '';
      });
      return obj;
    });
  };
  
  // Handle PIN Code CSV Upload
  const handlePincodeFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingPincode(true);
    setPincodeUploadStatus('idle');
    setPincodeUploadMessage('');
    setPincodeUploadProgress(0);

    try {
      const fileText = await file.text();
      const parsedData = parseCSV(fileText);

      console.log(`Parsed ${parsedData.length} PIN code records from CSV`);
      setPincodeTotalRecords(parsedData.length);

      // Process in parallel batches of 500 for 10x speed
      const batchSize = 500;
      const numBatches = Math.ceil(parsedData.length / batchSize);
      let totalImported = 0;
      let totalFailed = 0;

      // Process 3 batches in parallel for even faster upload
      const parallelBatches = 3;
      
      for (let i = 0; i < numBatches; i += parallelBatches) {
        const batchPromises = [];
        
        for (let j = 0; j < parallelBatches && (i + j) < numBatches; j++) {
          const batchIndex = i + j;
          batchPromises.push(
            fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6159e8d5/pincode-bulk-import`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify({
                data: parsedData,
                batchIndex,
                batchSize
              })
            }).then(res => res.json())
          );
        }
        
        const results = await Promise.all(batchPromises);
        
        results.forEach(result => {
          if (result.success) {
            totalImported += result.imported || 0;
            totalFailed += result.failed || 0;
          }
        });
        
        const progress = Math.min(100, Math.round(((i + parallelBatches) / numBatches) * 100));
        setPincodeUploadProgress(progress);
        setPincodeUploadMessage(`Uploading... ${totalImported} of ${parsedData.length} records`);
      }

      setPincodeUploadStatus('success');
      setPincodeUploadMessage(`✓ Successfully imported ${totalImported} PIN codes! ${totalFailed > 0 ? `(${totalFailed} skipped)` : ''}`);
      await loadStats();
    } catch (error) {
      console.error('PIN code upload error:', error);
      setPincodeUploadStatus('error');
      setPincodeUploadMessage(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploadingPincode(false);
      setPincodeUploadProgress(0);
      if (event.target) event.target.value = '';
    }
  };
  
  // Handle Company CSV Upload
  const handleCompanyFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploadingCompany(true);
    setCompanyUploadStatus('idle');
    setCompanyUploadMessage('');
    setCompanyUploadProgress(0);

    try {
      const fileText = await file.text();
      const parsedData = parseCSV(fileText);

      console.log(`Parsed ${parsedData.length} company records from CSV`);
      setCompanyTotalRecords(parsedData.length);

      const batchSize = 500;
      const numBatches = Math.ceil(parsedData.length / batchSize);
      let totalImported = 0;
      let totalFailed = 0;

      const parallelBatches = 3;
      
      for (let i = 0; i < numBatches; i += parallelBatches) {
        const batchPromises = [];
        
        for (let j = 0; j < parallelBatches && (i + j) < numBatches; j++) {
          const batchIndex = i + j;
          batchPromises.push(
            fetch(`https://${projectId}.supabase.co/functions/v1/make-server-6159e8d5/company-bulk-import`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`
              },
              body: JSON.stringify({
                data: parsedData,
                batchIndex,
                batchSize
              })
            }).then(res => res.json())
          );
        }
        
        const results = await Promise.all(batchPromises);
        
        results.forEach(result => {
          if (result.success) {
            totalImported += result.imported || 0;
            totalFailed += result.failed || 0;
          }
        });
        
        const progress = Math.min(100, Math.round(((i + parallelBatches) / numBatches) * 100));
        setCompanyUploadProgress(progress);
        setCompanyUploadMessage(`Uploading... ${totalImported} of ${parsedData.length} records`);
      }

      setCompanyUploadStatus('success');
      setCompanyUploadMessage(`✓ Successfully imported ${totalImported} companies! ${totalFailed > 0 ? `(${totalFailed} skipped)` : ''}`);
      await loadStats();
    } catch (error) {
      console.error('Company upload error:', error);
      setCompanyUploadStatus('error');
      setCompanyUploadMessage(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploadingCompany(false);
      setCompanyUploadProgress(0);
      if (event.target) event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Database Settings</h2>
        <p className="text-gray-600">
          Manage your Supabase database connection and bulk data imports
        </p>
      </div>

      {/* Database Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Database Connection</h3>
                <p className="text-sm text-gray-600">Connected to Supabase KV Store</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700">Active</span>
            </div>
          </div>

          {/* Database Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <div className="text-sm text-blue-600 mb-1">Companies</div>
              <div className="text-2xl font-bold text-blue-700">{stats.companies.toLocaleString()}</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <div className="text-sm text-purple-600 mb-1">PIN Codes</div>
              <div className="text-2xl font-bold text-purple-700">{stats.pincodes.toLocaleString()}</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <div className="text-sm text-green-600 mb-1">Banks</div>
              <div className="text-2xl font-bold text-green-700">{stats.banks.toLocaleString()}</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <div className="text-sm text-orange-600 mb-1">Live Offers</div>
              <div className="text-2xl font-bold text-orange-700">{stats.offers.toLocaleString()}</div>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={loadStats}
              disabled={isLoadingStats}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingStats ? 'animate-spin' : ''}`} />
              Refresh Stats
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* PIN Code CSV Import */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Import PIN Codes from CSV File
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload India Post PIN code database (150,000+ records) from{' '}
                <a 
                  href="https://data.gov.in/resource/6176ee09-3d56-4a3b-8115-21841576b2f6" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  data.gov.in
                </a>
                {' '}• CSV format only • Optimized for fast bulk import
              </p>

              {pincodeUploadStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Upload Complete!</p>
                    <p className="text-sm text-green-700 mt-1">{pincodeUploadMessage}</p>
                  </div>
                </div>
              )}

              {pincodeUploadStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Upload Failed</p>
                    <p className="text-sm text-red-700 mt-1">{pincodeUploadMessage}</p>
                  </div>
                </div>
              )}

              {isUploadingPincode && (
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{pincodeUploadMessage}</span>
                    <span className="font-medium text-gray-900">{pincodeUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pincodeUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handlePincodeFileUpload}
                  disabled={isUploadingPincode}
                  className="hidden"
                  id="pincode-csv-upload"
                />
                <label htmlFor="pincode-csv-upload">
                  <Button
                    variant="outline"
                    disabled={isUploadingPincode}
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploadingPincode ? 'Uploading...' : 'Upload PIN Code CSV'}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Data CSV Import */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Import Company Master Data from CSV
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload Indian company database from{' '}
                <a 
                  href="https://data.gov.in/catalog/company-master-data" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  data.gov.in
                </a>
                {' '}• Includes CIN, industry, sector info • CSV format only
              </p>

              {companyUploadStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Upload Complete!</p>
                    <p className="text-sm text-green-700 mt-1">{companyUploadMessage}</p>
                  </div>
                </div>
              )}

              {companyUploadStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Upload Failed</p>
                    <p className="text-sm text-red-700 mt-1">{companyUploadMessage}</p>
                  </div>
                </div>
              )}

              {isUploadingCompany && (
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{companyUploadMessage}</span>
                    <span className="font-medium text-gray-900">{companyUploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${companyUploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCompanyFileUpload}
                  disabled={isUploadingCompany}
                  className="hidden"
                  id="company-csv-upload"
                />
                <label htmlFor="company-csv-upload">
                  <Button
                    variant="outline"
                    disabled={isUploadingCompany}
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      {isUploadingCompany ? 'Uploading...' : 'Upload Company CSV'}
                    </span>
                  </Button>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initialize Sample Data */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Database className="w-6 h-6 text-orange-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">
                Initialize Database with Sample Data
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                One-time setup to populate database with sample banks, offers, and demo data
              </p>

              {initStatus === 'success' && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900">Database Initialized!</p>
                    <p className="text-sm text-green-700 mt-1">
                      Sample data has been imported successfully
                    </p>
                  </div>
                </div>
              )}

              {initStatus === 'error' && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Initialization Failed</p>
                    <p className="text-sm text-red-700 mt-1">
                      Please check console for errors
                    </p>
                  </div>
                </div>
              )}

              <Button
                onClick={handleInitialize}
                disabled={isInitializing}
                variant="outline"
              >
                <Database className={`w-4 h-4 mr-2 ${isInitializing ? 'animate-spin' : ''}`} />
                {isInitializing ? 'Initializing...' : 'Initialize Database'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}