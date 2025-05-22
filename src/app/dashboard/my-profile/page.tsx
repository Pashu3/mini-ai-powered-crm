'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/toast/ToastContext';
import { useAuth } from '@/context/auth-context';
import { 
  Loader2, 
  User, 
  Mail, 
  KeyRound, 
  ShieldCheck, 
  Save, 
  AlertCircle, 
  Calendar,
  LifeBuoy,
  ArrowLeft,
  X,
  Edit,
  BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  preferences: any;
  createdAt: string;
}

export default function MyProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await fetch('/api/users/me');
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch profile');
      }
      
      setProfile(data.data);
      setName(data.data.name);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching your profile');
      toast({
        type: 'error',
        title: 'Failed to load profile',
        description: err.message || 'Could not retrieve your profile information',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    
    try {
      const updateData: { name: string; currentPassword?: string; newPassword?: string } = {
        name
      };
      
      // Only include password fields if the user is trying to change password
      if (currentPassword && newPassword) {
        if (newPassword !== confirmPassword) {
          setPasswordError('New passwords do not match');
          setSaving(false);
          return;
        }
        
        if (newPassword.length < 8) {
          setPasswordError('New password must be at least 8 characters long');
          setSaving(false);
          return;
        }
        
        updateData.currentPassword = currentPassword;
        updateData.newPassword = newPassword;
      }
      
      const res = await fetch('/api/users/me', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await res.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      setProfile(data.data);
      
      // Clear password fields
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
      
      toast({
        type: 'success',
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
        duration: 3000
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
      toast({
        type: 'error',
        title: 'Update failed',
        description: err.message || 'Could not update your profile',
        duration: 5000
      });
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
              My Profile
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <User size={14} />
              <span>{profile?.name}</span>

              {profile?.role && (
                <>
                  <span className="text-muted-foreground">•</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                    {profile.role.charAt(0).toUpperCase() + profile.role.slice(1).toLowerCase()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setActiveTab('profile')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Edit size={16} />
              Edit Profile
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
        {/* Main profile information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Profile details card */}
          <div className="bg-card border border-border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User size={18} />
              {activeTab === 'profile' ? 'User Information' : 'Security Settings'}
            </h2>

            <form onSubmit={handleUpdateProfile}>
              {activeTab === 'profile' ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="block w-full rounded-md border border-input bg-background pl-10 px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={profile?.email || ''}
                          disabled
                          className="block w-full rounded-md border border-input bg-muted pl-10 px-3 py-2 text-muted-foreground shadow-sm"
                          placeholder="Your email"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Email address cannot be changed
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Role
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                          id="role"
                          name="role"
                          type="text"
                          value={profile?.role || ''}
                          disabled
                          className="block w-full rounded-md border border-input bg-muted pl-10 px-3 py-2 text-muted-foreground shadow-sm"
                          placeholder="Your role"
                        />
                      </div>
                    </div>
                    
                    {/* Joined Date */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Member Since
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <input
                          id="joined"
                          name="joined"
                          type="text"
                          value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ''}
                          disabled
                          className="block w-full rounded-md border border-input bg-muted pl-10 px-3 py-2 text-muted-foreground shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full flex justify-center items-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 text-sm font-medium shadow-sm transition-colors disabled:opacity-70"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Saving changes...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-5">
                  {passwordError && (
                    <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-md flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="block text-sm font-medium">
                      Current Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="block w-full rounded-md border border-input bg-background pl-10 px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter current password"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium">
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        minLength={8}
                        className="block w-full rounded-md border border-input bg-background pl-10 px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter new password"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Password must be at least 8 characters long
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        minLength={8}
                        className="block w-full rounded-md border border-input bg-background pl-10 px-3 py-2 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full flex justify-center items-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 text-sm font-medium shadow-sm transition-colors disabled:opacity-70"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Updating password...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Update Password</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              )}
            </form>
          </div>

          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-card border border-border rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <LifeBuoy size={18} />
                Security Tips
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-md">
                  <div className="flex gap-3 items-start">
                    <div className="mt-1">
                      <LifeBuoy className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Password Best Practices</h3>
                      <ul className="mt-2 text-sm text-muted-foreground space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span> 
                          Use a strong, unique password that's different from your other accounts
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span> 
                          Include a mix of letters, numbers, and special characters
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span> 
                          Never share your password with others
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary">•</span> 
                          Change your password regularly, especially if you suspect any security issues
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted/50 rounded-md">
                  <div className="flex gap-3 items-start">
                    <div className="mt-1">
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Account Security</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        If you notice any suspicious activity on your account, please change your password immediately 
                        and contact support at <a href="mailto:support@example.com" className="text-primary hover:underline">support@example.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-card border border-border rounded-lg shadow-sm p-6"
          >
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold">{profile?.name}</h2>
              <p className="text-muted-foreground">{profile?.email}</p>
              <div className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {profile?.role}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center gap-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  Security
                </button>
              </div>
            </div>
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

            </nav>
          </motion.div>
        </div>
      </div>
    </div>
  );
}