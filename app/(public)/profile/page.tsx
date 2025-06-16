'use client';

import { useState, useEffect } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { FiUser, FiMail, FiInstagram, FiCreditCard, FiEdit, FiSave, FiLoader } from 'react-icons/fi';
import { useAuth } from '@/app/contexts/AuthContext';
import { getUserProfile } from '@/app/service/dashboard-service';

interface UserProfile {
  email: string;
  username: string;
  instagramUsername: string | null;
  preferredPaymentMethod: string | null;
  balance: number;
  totalSpent: number;
  created_at: string;
}

const ProfilePage = () => {
  const { isLoggedIn } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Editable fields
  const [editableUsername, setEditableUsername] = useState('');
  const [editableInstagramUsername, setEditableInstagramUsername] = useState('');
  const [editablePaymentMethod, setEditablePaymentMethod] = useState('');
  
  // Success message
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [isLoggedIn]);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getUserProfile();
      if (response.success && response.data) {
        setProfile(response.data);
        
        // Initialize editable fields
        setEditableUsername(response.data.username || '');
        setEditableInstagramUsername(response.data.instagramUsername || '');
        setEditablePaymentMethod(response.data.preferredPaymentMethod || '');
      } else {
        setError('Failed to fetch profile data');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile information. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // In a real implementation, you would call an API to update the profile
      // For now, we'll simulate a successful update
      setTimeout(() => {
        if (profile) {
          const updatedProfile = {
            ...profile,
            username: editableUsername,
            instagramUsername: editableInstagramUsername,
            preferredPaymentMethod: editablePaymentMethod
          };
          setProfile(updatedProfile);
        }
        
        setIsEditing(false);
        setIsLoading(false);
        setSuccessMessage('Profile updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      }, 1000);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center mt-20">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Please Login</h2>
            <p className="text-gray-600 text-center mb-6">
              You need to be logged in to view your profile.
            </p>
            <button
              onClick={() => window.location.href = '/auth/signin'}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {isLoading && !profile ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="p-8">
                <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                  {error}
                </div>
                <button
                  onClick={fetchProfile}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : profile ? (
              <>
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-8">
                  <div className="flex items-center gap-6">
                    <div className="bg-white text-blue-600 rounded-full p-4">
                      <FiUser className="w-12 h-12" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">{profile.username}</h1>
                      <p className="opacity-80">Member since {new Date(profile.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex mt-6 space-x-6">
                    <div>
                      <p className="text-sm opacity-80">Balance</p>
                      <p className="text-xl font-semibold">${profile.balance}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Total Spent</p>
                      <p className="text-xl font-semibold">${profile.totalSpent}</p>
                    </div>
                  </div>
                </div>

                {/* Success Message */}
                {successMessage && (
                  <div className="bg-green-50 text-green-700 p-4 m-6 rounded-lg">
                    {successMessage}
                  </div>
                )}

                {/* Profile Content */}
                <div className="px-6 py-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                      >
                        <FiEdit /> Edit Profile
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        disabled={isLoading}
                      >
                        {isLoading ? <FiLoader className="animate-spin" /> : <FiSave />}
                        Save Changes
                      </button>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FiUser className="text-blue-600" />
                        <p className="font-medium text-gray-700">Username</p>
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableUsername}
                          onChange={(e) => setEditableUsername(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      ) : (
                        <p className="text-gray-900 ml-8">{profile.username}</p>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FiMail className="text-blue-600" />
                        <p className="font-medium text-gray-700">Email Address</p>
                      </div>
                      <p className="text-gray-900 ml-8">{profile.email}</p>
                      <p className="text-sm text-gray-500 ml-8 mt-1">Email cannot be changed</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FiInstagram className="text-blue-600" />
                        <p className="font-medium text-gray-700">Instagram Username</p>
                      </div>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editableInstagramUsername}
                          onChange={(e) => setEditableInstagramUsername(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Your Instagram username"
                        />
                      ) : (
                        <p className="text-gray-900 ml-8">
                          {profile.instagramUsername || "Not set"}
                        </p>
                      )}
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FiCreditCard className="text-blue-600" />
                        <p className="font-medium text-gray-700">Preferred Payment Method</p>
                      </div>
                      {isEditing ? (
                        <select
                          value={editablePaymentMethod || ""}
                          onChange={(e) => setEditablePaymentMethod(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select a payment method</option>
                          <option value="credit_card">Credit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="crypto_btc">Bitcoin (BTC)</option>
                          <option value="crypto_eth">Ethereum (ETH)</option>
                          <option value="crypto_usdt">Tether (USDT)</option>
                          <option value="bank_transfer">Bank Transfer</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 ml-8">
                          {profile.preferredPaymentMethod 
                            ? profile.preferredPaymentMethod.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                            : "Not set"}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
                    <div className="flex flex-wrap gap-4">
                      <a 
                        href="/dashboard" 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        View Dashboard
                      </a>
                      <button 
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;