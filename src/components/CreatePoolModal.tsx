'use client';

import { useState } from 'react';
import { Company } from '@/types';
import { useStore } from '@/lib/store';
import { constellationClient } from '@/lib/constellation';
import { usePools } from '@/hooks/usePools';
import {
  XMarkIcon,
  ShieldCheckIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline';

interface CreatePoolModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePoolModal({ isOpen, onClose }: CreatePoolModalProps) {
  const { createPool } = usePools();
  const { address } = useStore();

  const [formData, setFormData] = useState({
    companyName: '',
    ein: '',
    headquarters: '',
    industry: '',
    poolName: '',
    description: '',
    threshold: 75,
  });

  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    setIsCreating(true);

    try {
      const company: Company = {
        name: formData.companyName,
        ein: formData.ein,
        headquarters: formData.headquarters,
        industry: formData.industry,
      };

      // Update createPool call to include company
      const poolId = `pool-${Date.now()}`;
      await constellationClient.createPool(
        poolId,
        address,
        company,
        formData.poolName,
        formData.description,
        formData.threshold
      );

      // Create pool object and add to store
      await createPool(formData.poolName, formData.description, address, company, formData.threshold);

      // Reset form
      setFormData({
        companyName: '',
        ein: '',
        headquarters: '',
        industry: '',
        poolName: '',
        description: '',
        threshold: 75,
      });

      onClose();
      alert('Pool created successfully!');
    } catch (error) {
      console.error('Failed to create pool:', error);
      alert('Failed to create pool. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Create New Pool</h2>
              <p className="text-gray-400 text-sm">Launch an evidence collection pool</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <BuildingOfficeIcon className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Company Information</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  placeholder="e.g., GoogleCorp Inc."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  EIN (Tax ID) *
                </label>
                <input
                  type="text"
                  name="ein"
                  value={formData.ein}
                  onChange={handleChange}
                  required
                  placeholder="94-1234567"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Headquarters *
                </label>
                <input
                  type="text"
                  name="headquarters"
                  value={formData.headquarters}
                  onChange={handleChange}
                  required
                  placeholder="Mountain View, CA"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Industry *
                </label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 transition"
                >
                  <option value="" className="bg-gray-900">Select industry</option>
                  <option value="Technology / Software" className="bg-gray-900">Technology / Software</option>
                  <option value="Financial Services" className="bg-gray-900">Financial Services</option>
                  <option value="Healthcare / Biotech" className="bg-gray-900">Healthcare / Biotech</option>
                  <option value="E-commerce / Retail" className="bg-gray-900">E-commerce / Retail</option>
                  <option value="Energy / Oil & Gas" className="bg-gray-900">Energy / Oil & Gas</option>
                  <option value="Real Estate" className="bg-gray-900">Real Estate</option>
                  <option value="Manufacturing" className="bg-gray-900">Manufacturing</option>
                  <option value="Telecommunications" className="bg-gray-900">Telecommunications</option>
                  <option value="Other" className="bg-gray-900">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pool Information */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="text-lg font-semibold text-white">Pool Details</h3>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Pool Name *
              </label>
              <input
                type="text"
                name="poolName"
                value={formData.poolName}
                onChange={handleChange}
                required
                placeholder="e.g., Tax Evasion Investigation"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describe the evidence you're looking for..."
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Evidence Strength Threshold: {formData.threshold}%
              </label>
              <input
                type="range"
                name="threshold"
                value={formData.threshold}
                onChange={handleChange}
                min="50"
                max="95"
                step="5"
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-1">
                Auction triggers when pool reaches this strength level
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white rounded-xl transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreating || !address}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-xl transition font-semibold shadow-lg disabled:cursor-not-allowed"
            >
              {isCreating ? 'Creating...' : 'Create Pool'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
