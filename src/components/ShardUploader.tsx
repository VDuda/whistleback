'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePools } from '@/hooks/usePools';
import { useTokens } from '@/hooks/useTokens';
import { useWallet } from '@/hooks/useWallet';
import {
  CloudArrowUpIcon,
  ShieldCheckIcon,
  DocumentIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface ShardUploaderProps {
  poolId: string;
}

export function ShardUploader({ poolId }: ShardUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { uploadShard } = usePools();
  const { mintToken } = useTokens();
  const { address } = useWallet();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file || !address) return;

    setIsUploading(true);
    setUploadProgress(10);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload shard to Constellation network
      const shard = await uploadShard(poolId, file, address);
      setUploadProgress(50);

      // Mint narrative token on Story Protocol
      const tokenId = await mintToken(shard.hash, poolId, address);
      setUploadProgress(100);

      clearInterval(progressInterval);
      setUploadComplete(true);

      // Redirect back to pools after 3 seconds
      setTimeout(() => {
        router.push('/dashboard/tokens');
      }, 3000);
    } catch (error) {
      console.error('Upload failed:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (uploadComplete) {
    return (
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 backdrop-blur-sm rounded-3xl p-8 text-center">
        <div className="relative mb-6">
          <CheckCircleIcon className="w-20 h-20 text-green-400 mx-auto animate-float" />
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Evidence Uploaded Successfully! 🎉</h3>
        <div className="space-y-2 text-gray-300 mb-6">
          <p className="flex items-center justify-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-green-400" />
            Your shard encrypted and added to pool
          </p>
          <p className="flex items-center justify-center gap-2">
            <DocumentIcon className="w-5 h-5 text-blue-400" />
            Narrative token minted on Story Protocol
          </p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
          <p className="text-sm text-gray-400">Redirecting to your tokens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-3xl p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Upload Evidence Shard</h3>
        <p className="text-gray-400">Pool ID: <span className="text-blue-400 font-mono">{poolId}</span></p>
      </div>

      <div className="space-y-6">
        <div className="group border-2 border-dashed border-white/20 hover:border-blue-500/50 rounded-2xl p-12 text-center transition-all duration-300 bg-gradient-to-br from-white/5 to-transparent">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <div className="relative">
            {file ? (
              <div className="space-y-4">
                <DocumentIcon className="w-16 h-16 text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-medium text-lg">{file.name}</p>
                  <p className="text-gray-400 text-sm">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg cursor-pointer transition"
                >
                  Choose Different File
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <CloudArrowUpIcon className="w-16 h-16 text-gray-400 mx-auto group-hover:scale-110 transition-transform" />
                <div>
                  <p className="text-white font-medium text-lg mb-1">Drop your evidence here</p>
                  <p className="text-gray-400 text-sm">or click to browse</p>
                </div>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
                >
                  <CloudArrowUpIcon className="w-5 h-5" />
                  Select File
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/5 border border-blue-500/20 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-blue-400 font-semibold mb-3">End-to-End Security</p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>File encrypted client-side with AES-256</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Zero-Knowledge proof generated for verification</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Uploaded to Constellation Metagraph (feeless)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  <span>Minted as narrative token on Story Protocol</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {isUploading && (
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <span className="text-white font-medium">Processing...</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-gray-400 text-sm mt-2">{uploadProgress}% complete</p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || !address || isUploading}
          className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:shadow-2xl hover:scale-[1.02] flex items-center justify-center gap-3"
        >
          {isUploading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <CloudArrowUpIcon className="w-6 h-6" />
              Upload & Mint Token
            </>
          )}
        </button>

        {!address && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center">
            <p className="text-yellow-400 font-medium">⚠️ Please connect your wallet to upload evidence</p>
          </div>
        )}
      </div>
    </div>
  );
}