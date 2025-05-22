"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  AlertCircle,
  Users,
  Calendar,
  Target,
  Info,
  X,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'DRAFT';
  startDate?: string;
  endDate?: string;
  isActive?: boolean;
  createdAt?: string;
  _count?: {
    leads?: number;
    steps?: number;
  };
}

export default function CampaignEditPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [editedCampaign, setEditedCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaign() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/campaigns/${campaignId}`);

        if (!response.ok) {
          throw new Error(`Error fetching campaign: ${response.status}`);
        }

        const data = await response.json();

        // Handle the success response format
        const campaignData = data.success && data.data
          ? data.data
          : data;

        setCampaign(campaignData);
        setEditedCampaign(campaignData);
      } catch (err) {
        console.error('Failed to fetch campaign:', err);
        setError('Failed to load campaign details. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [campaignId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!editedCampaign) return;

    const { name, value } = e.target;

    setEditedCampaign({
      ...editedCampaign,
      [name]: value,
    });
  };

  const handleSave = async () => {
    if (!editedCampaign) return;

    try {
      setSaving(true);
      setError(null);

      const updateData = {
        name: editedCampaign.name,
        description: editedCampaign.description,
        status: editedCampaign.status,
        startDate: editedCampaign.startDate,
        endDate: editedCampaign.endDate,
      };

      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update campaign');
      }

      // Navigate back to campaign detail page
      router.push(`/dashboard/campaigns/${campaignId}`);
    } catch (err) {
      console.error('Failed to update campaign:', err);
      setError(err instanceof Error ? err.message : 'Failed to update campaign');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !campaign) {
    return (
      <div className="bg-destructive/10 text-destructive p-6 rounded-lg border border-destructive/20">
        <AlertCircle className="h-6 w-6 mb-2" />
        <h3 className="font-medium text-lg">Error loading campaign</h3>
        <p>{error}</p>
        <div className="flex gap-3 mt-4">
          <Link
            href="/dashboard/campaigns"
            className="px-4 py-2 bg-background border border-input rounded-md"
          >
            Back to Campaigns
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!editedCampaign) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/campaigns/${campaignId}`}
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to campaign</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">
              Edit Campaign
            </h1>
            <p className="text-muted-foreground">Update campaign information</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            href={`/dashboard/campaigns/${campaignId}`}
            className="px-4 py-2 border border-input rounded-md hover:bg-muted transition-colors"
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
            disabled={saving}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-3"
        >
          <AlertCircle size={20} />
          <p>{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto p-1 rounded-full hover:bg-destructive/20 transition-colors"
          >
            <X size={16} />
            <span className="sr-only">Dismiss</span>
          </button>
        </motion.div>
      )}

      {/* Campaign form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-card border border-border rounded-lg shadow-sm p-6"
      >
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Users size={18} />
          Campaign Details
        </h2>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          {/* Name and Status in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                Campaign Name <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={editedCampaign.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-muted-foreground mb-1">
                Status <span className="text-destructive">*</span>
              </label>
              <select
                id="status"
                name="status"
                value={editedCampaign.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="PAUSED">Paused</option>
                <option value="COMPLETED">Completed</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          {/* Dates in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-muted-foreground mb-1">
                Start Date
              </label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                value={editedCampaign.startDate || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-muted-foreground mb-1">
                End Date
              </label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                value={editedCampaign.endDate || ''}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-input bg-background rounded-md"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-muted-foreground mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={editedCampaign.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-input bg-background rounded-md resize-none"
            />
          </div>
        </form>
      </motion.div>

      {/* Additional info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-card border border-border rounded-lg shadow-sm p-6"
      >
        <h3 className="font-medium mb-4 flex items-center gap-2">
          <Info size={18} />
          Campaign Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-sm text-muted-foreground block mb-1">Associated Leads</span>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-primary" />
              <span className="font-medium">{editedCampaign._count?.leads || 0} leads</span>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground block mb-1">Campaign Steps</span>
            <div className="flex items-center gap-2">
              <Target size={16} className="text-primary" />
              <span className="font-medium">{editedCampaign._count?.steps || 0} steps</span>
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground block mb-1">Campaign ID</span>
            <div className="font-mono text-xs bg-muted p-1.5 rounded">
              {editedCampaign.id}
            </div>
          </div>

          <div>
            <span className="text-sm text-muted-foreground block mb-1">Created</span>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <span>
                {campaign && campaign.createdAt
                  ? new Date(campaign.createdAt).toLocaleDateString()
                  : 'Unknown date'}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}