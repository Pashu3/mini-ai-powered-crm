'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useToast } from '@/components/ui/toast/ToastContext';
import {
  Loader2,
  Save,
  Settings,
  AlertCircle,
  ArrowLeft,
  X,
  Moon,
  Sun,
  Bell,
  Eye,
  Layout,
  Monitor
} from 'lucide-react';

interface UserPreferences {
  theme?: 'light' | 'dark' | 'system';
  emailNotifications?: {
    marketing?: boolean;
    updates?: boolean;
    leadActivity?: boolean;
  };
  dashboardLayout?: 'compact' | 'comfortable' | 'spacious';
  tableDisplayMode?: 'compact' | 'default';
}

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'system',
    emailNotifications: {
      marketing: false,
      updates: true,
      leadActivity: true
    },
    dashboardLayout: 'comfortable',
    tableDisplayMode: 'default'
  });
  
  const [originalPreferences, setOriginalPreferences] = useState<UserPreferences>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/users/me/preferences');
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch preferences');
      }
      
      const fetchedPreferences = data.data || {};
      setPreferences({
        theme: fetchedPreferences.theme || 'system',
        emailNotifications: {
          marketing: fetchedPreferences.emailNotifications?.marketing ?? false,
          updates: fetchedPreferences.emailNotifications?.updates ?? true,
          leadActivity: fetchedPreferences.emailNotifications?.leadActivity ?? true
        },
        dashboardLayout: fetchedPreferences.dashboardLayout || 'comfortable',
        tableDisplayMode: fetchedPreferences.tableDisplayMode || 'default'
      });
      setOriginalPreferences(fetchedPreferences);
      
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching your preferences');
      toast({
        type: 'error',
        title: 'Failed to load settings',
        description: err.message || 'Could not retrieve your preferences',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    try {
      setSaving(true);
      setError('');
      
      const res = await fetch('/api/users/me/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preferences)
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update preferences');
      }
      
      setOriginalPreferences(preferences);
      
      toast({
        type: 'success',
        title: 'Settings saved',
        description: 'Your preferences have been updated successfully',
        duration: 3000
      });
    } catch (err: any) {
      setError(err.message || 'Failed to save preferences');
      toast({
        type: 'error',
        title: 'Update failed',
        description: err.message || 'Could not update your preferences',
        duration: 5000
      });
    } finally {
      setSaving(false);
    }
  };

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setPreferences({
      ...preferences,
      theme
    });
  };

  const handleEmailNotificationChange = (key: string, value: boolean) => {
    setPreferences({
      ...preferences,
      emailNotifications: {
        ...(preferences.emailNotifications || {}),
        [key]: value
      }
    });
  };

  const handleLayoutChange = (layout: 'compact' | 'comfortable' | 'spacious') => {
    setPreferences({
      ...preferences,
      dashboardLayout: layout
    });
  };

  const handleTableModeChange = (mode: 'compact' | 'default') => {
    setPreferences({
      ...preferences,
      tableDisplayMode: mode
    });
  };

  const hasChanges = JSON.stringify(preferences) !== JSON.stringify(originalPreferences);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-full hover:bg-accent"
          >
            <ArrowLeft size={20} />
            <span className="sr-only">Back to dashboard</span>
          </Link>

          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your app preferences and notifications
            </p>
          </div>
        </div>

        <div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={handleSavePreferences}
              disabled={saving || !hasChanges}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save
                </>
              )}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Error message */}
      {error && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-destructive/10 text-destructive p-4 rounded-md flex items-center gap-3"
          >
            <AlertCircle size={20} />
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              className="ml-auto p-1 rounded-full hover:bg-destructive/20 transition-colors"
            >
              <X size={16} />
              <span className="sr-only">Dismiss</span>
            </button>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Appearance Settings */}
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Settings size={18} />
                Appearance
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Customize how the application looks and feels
              </p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Theme selection */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.theme === 'light'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Sun className="h-6 w-6 mb-2" />
                    <span className="text-sm">Light</span>
                  </button>

                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.theme === 'dark'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Moon className="h-6 w-6 mb-2" />
                    <span className="text-sm">Dark</span>
                  </button>

                  <button
                    onClick={() => handleThemeChange('system')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.theme === 'system'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Monitor className="h-6 w-6 mb-2" />
                    <span className="text-sm">System</span>
                  </button>
                </div>
              </div>

              {/* Layout Density */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Dashboard Layout
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleLayoutChange('compact')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.dashboardLayout === 'compact'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Layout className="h-6 w-6 mb-2" />
                    <span className="text-sm">Compact</span>
                  </button>

                  <button
                    onClick={() => handleLayoutChange('comfortable')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.dashboardLayout === 'comfortable'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Layout className="h-6 w-6 mb-2" />
                    <span className="text-sm">Comfortable</span>
                  </button>

                  <button
                    onClick={() => handleLayoutChange('spacious')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.dashboardLayout === 'spacious'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Layout className="h-6 w-6 mb-2" />
                    <span className="text-sm">Spacious</span>
                  </button>
                </div>
              </div>

              {/* Table Display Mode */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Table Display Mode
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleTableModeChange('default')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.tableDisplayMode === 'default'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Eye className="h-6 w-6 mb-2" />
                    <span className="text-sm">Default</span>
                  </button>

                  <button
                    onClick={() => handleTableModeChange('compact')}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      preferences.tableDisplayMode === 'compact'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-accent/50'
                    }`}
                  >
                    <Eye className="h-6 w-6 mb-2" />
                    <span className="text-sm">Compact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Email Notification Settings */}
          <div className="bg-card border border-border rounded-lg shadow-sm">
            <div className="p-6 border-b border-border">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Bell size={18} />
                Notifications
              </h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Configure when and how you want to be notified
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Lead Activity Updates</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when leads are updated or change status
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={preferences.emailNotifications?.leadActivity || false} 
                      onChange={(e) => handleEmailNotificationChange('leadActivity', e.target.checked)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Product Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Stay informed about new features and improvements
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.emailNotifications?.updates || false} 
                        onChange={(e) => handleEmailNotificationChange('updates', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Marketing Communications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional offers and marketing emails
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={preferences.emailNotifications?.marketing || false} 
                        onChange={(e) => handleEmailNotificationChange('marketing', e.target.checked)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-medium mb-4">Settings Summary</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Theme</h4>
                <p className="flex items-center gap-2">
                  {preferences.theme === 'light' ? (
                    <>
                      <Sun className="h-4 w-4" />
                      <span>Light Mode</span>
                    </>
                  ) : preferences.theme === 'dark' ? (
                    <>
                      <Moon className="h-4 w-4" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Monitor className="h-4 w-4" />
                      <span>System Default</span>
                    </>
                  )}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Layout</h4>
                <p className="capitalize">{preferences.dashboardLayout}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Table Display</h4>
                <p className="capitalize">{preferences.tableDisplayMode}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Email Notifications</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center gap-1">
                    <span className={preferences.emailNotifications?.leadActivity ? "text-green-500" : "text-destructive"}>
                      {preferences.emailNotifications?.leadActivity ? "✓" : "✗"}
                    </span>
                    Lead Activity
                  </li>
                  <li className="flex items-center gap-1">
                    <span className={preferences.emailNotifications?.updates ? "text-green-500" : "text-destructive"}>
                      {preferences.emailNotifications?.updates ? "✓" : "✗"}
                    </span>
                    Product Updates
                  </li>
                  <li className="flex items-center gap-1">
                    <span className={preferences.emailNotifications?.marketing ? "text-green-500" : "text-destructive"}>
                      {preferences.emailNotifications?.marketing ? "✓" : "✗"}
                    </span>
                    Marketing
                  </li>
                </ul>
              </div>
            </div>
            
            {hasChanges && (
              <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-md text-sm">
                <p>You have unsaved changes</p>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            
            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors w-full text-sm"
              >
                <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                <span>Back to Dashboard</span>
              </Link>
              
              <Link
                href="/dashboard/my-profile"
                className="flex items-center gap-2 p-2 hover:bg-muted rounded-md transition-colors w-full text-sm"
              >
                <Settings className="h-4 w-4 text-muted-foreground" />
                <span>Edit Profile</span>
              </Link>
            </nav>
          </motion.div>
        </div>
      </div>
    </div>
  );
}