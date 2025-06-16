'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useEffect, useState } from 'react';
import { FiPackage, FiClock, FiCheck, FiShoppingBag, FiMessageSquare, FiBell, FiX } from 'react-icons/fi';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useAuth } from '@/app/contexts/AuthContext';
import { 
  getUserProfile, 
  // getUserOrders, 
  getUserTransactions, 
  getUserTickets, 
  getUserNotifications,
  addFunds,
  // requestRefill,
  createTicket,
  // processCryptoPayment,
  getPaymentMethods
} from '@/app/service/dashboard-service';

// interface OrderItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
// }

interface Order {
  _id: string;
  userId: string;
  status: string;
  serviceType: string;
  quality: string;
  quantity: number;
  price: number;
  instagramUsername: string;
  postUrl?: string;
  createdAt: string;
  completedAt?: string;
  paymentMethod: string;
}

interface Invoice {
  id: string;
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  status: 'paid' | 'pending';
}

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

interface SupportTicket {
  _id: string;
  orderId?: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
  lastResponseAt: string;
  messages: {
    sender: string;
    message: string;
    createdAt: string;
  }[];
}

interface Transaction {
  _id: string;
  orderId?: string;
  amount: number;
  status: string;
  paymentMethod: string;
  description: string;
  createdAt: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  active: boolean;
  fees: string;
  icon: string;
}

const DashboardPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState('in-progress');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState('orders');
  const [balance, setBalance] = useState(0);
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showRefillModal, setShowRefillModal] = useState(false);
  const [showTicketDetailModal, setShowTicketDetailModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [refillOrderId, setRefillOrderId] = useState('');
  const ordersPerPage = 4;

  // State for API data
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // State for add funds form
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');
  const [amount, setAmount] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // State for new ticket form
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketOrderId, setTicketOrderId] = useState('');
  
  // State for refill form
  const [currentCount, setCurrentCount] = useState('');
  const [expectedCount, setExpectedCount] = useState('');
  const [refillNotes, setRefillNotes] = useState('');

  const cryptoNetworks = {
    usdt: ['Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Tron (TRC20)', 'Polygon', 'Solana'],
    usdc: ['Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Polygon', 'Solana', 'Avalanche'],
    bnb: ['BNB Smart Chain (BEP20)', 'Ethereum (ERC20)'],
    sol: ['Solana'],
    eth: ['Ethereum (ERC20)'],
    btc: ['Bitcoin'],
    matic: ['Polygon', 'Ethereum (ERC20)'],
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchDashboardData();
    }
  }, [isLoggedIn]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch user profile
      const profileResponse = await getUserProfile();
      if (profileResponse?.data) {
        setBalance(profileResponse.data.balance || 0);
      }

      // Fetch orders
      // const ordersResponse = await getUserOrders();
      // if (ordersResponse?.data) {
      //   setOrders(ordersResponse.data);
      // }

      // Fetch notifications
      const notificationsResponse = await getUserNotifications();
      if (notificationsResponse?.data) {
        setNotifications(notificationsResponse.data);
      }

      // Fetch tickets
      const ticketsResponse = await getUserTickets();
      if (ticketsResponse?.data) {
        setTickets(ticketsResponse.data);
      }

      // Fetch transactions
      const transactionsResponse = await getUserTransactions();
      if (transactionsResponse?.data) {
        setTransactions(transactionsResponse.data);
      }

      // Fetch payment methods
      const paymentMethodsResponse = await getPaymentMethods();
      if (paymentMethodsResponse?.data) {
        setPaymentMethods(paymentMethodsResponse.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inProgressOrders = orders.filter(order => ['pending', 'processing'].includes(order.status));
  const completedOrders = orders.filter(order => ['completed', 'partial'].includes(order.status));

  // Get current orders based on pagination
  const getCurrentOrders = () => {
    const currentOrders = activeTab === 'in-progress' ? inProgressOrders : completedOrders;
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return currentOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  };

  // Calculate total pages
  const totalOrders = activeTab === 'in-progress' ? inProgressOrders.length : completedOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  // Function to generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // Reset to first page when switching tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const getStatusDetails = (status: string) => {
    const details = {
      completed: {
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: <FiCheck className="w-4 h-4" />,
      },
      processing: {
        color: 'bg-blue-50 text-blue-700 border-blue-200',
        icon: <FiClock className="w-4 h-4" />,
      },
      pending: {
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: <FiPackage className="w-4 h-4" />,
      },
      partial: {
        color: 'bg-purple-50 text-purple-700 border-purple-200',
        icon: <FiCheck className="w-4 h-4" />,
      },
      canceled: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: <FiX className="w-4 h-4" />,
      },
      failed: {
        color: 'bg-red-50 text-red-700 border-red-200',
        icon: <FiX className="w-4 h-4" />,
      }
    };
    return details[status as keyof typeof details] || details.pending;
  };

  const handleDownloadPDF = (invoice: Invoice) => {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFontSize(20);
    doc.setTextColor(66, 133, 244); // Blue color
    doc.text('LikesIO', 20, 20);
    
    // Add invoice details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice #${invoice.id}`, 20, 40);
    doc.text(`Date: ${new Date(invoice.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Order #${invoice.orderId}`, 20, 60);
    
    // Find corresponding order
    const order = orders.find(o => o._id === invoice.orderId);
    
    // Add billing information
    doc.text('Bill To:', 20, 80);
    doc.setFontSize(11);
    doc.text(`Customer Name: ${user?.username || user?.name || 'Customer'}`, 20, 90);
    doc.text(`Customer ID: ${user?.id || 'USER001'}`, 20, 100);
    
    // Add payment information
    doc.text('Payment Method:', 120, 80);
    doc.text(invoice.paymentMethod, 120, 90);
    doc.text('Payment Status:', 120, 100);
    doc.text(invoice.status.toUpperCase(), 120, 110);
    
    // Add order items table
    const tableData = order ? [
      [
        `${order.serviceType} - ${order.quantity} ${order.serviceType === 'followers' ? 'followers' : order.serviceType}`,
        '1',
        `$${order.price.toFixed(2)}`,
        `$${order.price.toFixed(2)}`
      ]
    ] : [];
    
    autoTable(doc, {
      head: [['Item', 'Quantity', 'Price', 'Total']],
      body: tableData,
      startY: 120,
      theme: 'grid',
      headStyles: { fillColor: [66, 133, 244] },
      styles: { fontSize: 10 },
    });
    
    // Add total amount
    const finalY = (doc as any).lastAutoTable.finalY || 120;
    doc.text('Total Amount:', 140, finalY + 20);
    doc.setFontSize(12);
    doc.setTextColor(66, 133, 244);
    doc.text(`$${invoice.total.toFixed(2)}`, 170, finalY + 20);
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text('Thank you for your business!', 20, finalY + 40);
    doc.text('For any questions, please contact support@likesio.com', 20, finalY + 50);
    
    // Save the PDF
    doc.save(`invoice-${invoice.id}.pdf`);
  };

  const handleViewTicketDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setShowTicketDetailModal(true);
  };

  const handleRefillRequest = (orderId: string) => {
    setRefillOrderId(orderId);
    setShowRefillModal(true);
  };

  const submitRefillRequest = async () => {
    if (!refillOrderId) return;
    
    // try {
    //   await requestRefill(refillOrderId);
    //   setShowRefillModal(false);
    //   // Refresh orders to show updated status
    //   const ordersResponse = await getUserOrders();
    //   if (ordersResponse?.data) {
    //     setOrders(ordersResponse.data);
    //   }
    //   alert('Refill request submitted successfully');
    // } catch (error) {
    //   console.error('Error requesting refill:', error);
    //   alert('Failed to submit refill request. Please try again later.');
    // }
  };

  const getWalletAddress = (crypto: string, network: string) => {
    // In a real application, these would be actual wallet addresses
    const addresses = {
      'usdt-Ethereum (ERC20)': '0x1234567890abcdef1234567890abcdef12345678',
      'usdt-BNB Smart Chain (BEP20)': '0xabcdef1234567890abcdef1234567890abcdef12',
      'usdt-Tron (TRC20)': 'TRx1234567890abcdef1234567890abcdef12345678',
      'btc-Bitcoin': 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      // Add more addresses as needed
    };
    return addresses[`${crypto}-${network}`] || 'Address will be provided after amount confirmation';
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
    setSelectedNetwork('');
  };

  const handleAddFunds = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    try {
      const response = await addFunds(parseFloat(amount), selectedPaymentMethod);
      
      if (selectedPaymentMethod.includes('credit_card')) {
        // Redirect to credit card payment processor
        window.location.href = response.data.redirectUrl;
      } else if (selectedPaymentMethod === 'paypal') {
        // Redirect to PayPal
        window.location.href = response.data.redirectUrl;
      } else {
        // For crypto payments, show payment details
        alert(`Please send ${amount} ${selectedPaymentMethod.toUpperCase()} to the provided wallet address`);
        setShowAddFundsModal(false);
      }
    } catch (error) {
      console.error('Error adding funds:', error);
      alert('Failed to initialize payment. Please try again.');
    }
  };

  const submitNewTicket = async () => {
    if (!ticketSubject || !ticketMessage) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await createTicket({
        subject: ticketSubject,
        message: ticketMessage,
        orderId: ticketOrderId || undefined,
        priority: 'medium'
      });
      
      setShowNewTicketModal(false);
      setTicketSubject('');
      setTicketMessage('');
      setTicketOrderId('');
      
      // Refresh tickets
      const ticketsResponse = await getUserTickets();
      if (ticketsResponse?.data) {
        setTickets(ticketsResponse.data);
      }
      
      alert('Ticket created successfully');
    } catch (error) {
      console.error('Error creating ticket:', error);
      alert('Failed to create ticket. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center mt-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-24">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Header Section - Mobile Optimized */}
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2.5 sm:p-3 rounded-xl">
                  <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
              </div>
            </div>

            {/* Balance Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Available Balance</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">${balance.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => setShowAddFundsModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Funds
                </button>
              </div>
            </div>

            {/* Stats Cards - Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Total Orders</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5 sm:mt-1">{orders.length}</p>
                  </div>
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <FiShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">In Progress</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-0.5 sm:mt-1">{inProgressOrders.length}</p>
                  </div>
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <FiClock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Support Tickets</p>
                    <p className="text-xl sm:text-2xl font-bold text-amber-600 mt-0.5 sm:mt-1">{tickets.length}</p>
                  </div>
                  <div className="bg-amber-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <FiMessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Notifications</p>
                    <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-0.5 sm:mt-1">{notifications.filter(n => !n.read).length}</p>
                  </div>
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                    <FiBell className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['orders', 'invoices', 'tickets', 'notifications'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeSection === section
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content Sections */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {activeSection === 'orders' && (
              <div className="p-4">
                {/* Existing Orders Content */}
                <div className="flex p-1.5 sm:p-2 gap-1.5 sm:gap-2 bg-gray-50 border-b border-gray-100">
                  {['in-progress', 'completed'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabChange(tab)}
                      className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-all duration-200
                        ${activeTab === tab
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-600 hover:bg-white/50'}`}
                    >
                      {tab === 'in-progress' ? 'In Progress' : 'Completed'}
                    </button>
                  ))}
                </div>
                {/* Orders List */}
                <div className="space-y-3 sm:space-y-4">
                  {getCurrentOrders().map((order) => (
                    <div key={order._id}
                      className="group rounded-lg sm:rounded-xl border border-gray-100 hover:border-blue-100 transition-all duration-200"
                    >
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className="bg-gray-100 group-hover:bg-blue-50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl transition-colors duration-200">
                              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Order #{order._id.substring(0, 8)}</h3>
                              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
                            <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border ${getStatusDetails(order.status).color}`}>
                              {getStatusDetails(order.status).icon}
                              <span className="text-xs sm:text-sm font-medium">{order.status}</span>
                            </div>
                            <p className="text-base sm:text-lg font-bold text-gray-900">${order.price.toFixed(2)}</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                          <div className="flex items-center justify-between py-2.5 sm:py-3 border-b border-gray-200">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              <span className="bg-white w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600 flex-shrink-0">
                                {order.quantity}x
                              </span>
                              <span className="text-gray-900 text-sm sm:text-base truncate">
                                Instagram {order.serviceType} - {order.quality}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900 text-sm sm:text-base flex-shrink-0">
                                ${order.price.toFixed(2)}
                              </span>
                              {(order.status === 'completed' || order.status === 'partial') && (
                                <button
                                  onClick={() => handleRefillRequest(order._id)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  Request Refill
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="py-2 text-sm">
                            <p><span className="font-medium">Username:</span> {order.instagramUsername}</p>
                            {order.postUrl && (
                              <p className="mt-1"><span className="font-medium">Post URL:</span> <a href={order.postUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{order.postUrl.substring(0, 50)}...</a></p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  {totalOrders > ordersPerPage && (
                    <div className="flex items-center justify-center space-x-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        Previous
                      </button>

                      {getPageNumbers().map((pageNumber) => (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium
                            ${currentPage === pageNumber
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          {pageNumber}
                        </button>
                      ))}

                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Empty State - Mobile Optimized */}
                  {getCurrentOrders().length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <FiPackage className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <h3 className="text-gray-500 font-medium text-sm sm:text-base">
                        No {activeTab === 'in-progress' ? 'in-progress' : 'completed'} orders
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'invoices' && (
              <div className="p-4">
                <div className="space-y-4">
                  {invoices.length > 0 ? (
                    invoices.map((invoice) => (
                      <div key={invoice.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">Invoice #{invoice.id}</h3>
                            <p className="text-sm text-gray-500">Order #{invoice.orderId}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">${invoice.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">{invoice.paymentMethod}</p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                          <button
                            onClick={() => handleDownloadPDF(invoice)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Download PDF
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <FiPackage className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <h3 className="text-gray-500 font-medium text-sm sm:text-base">
                        No invoices found
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'tickets' && (
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Support Tickets</h2>
                  <button
                    onClick={() => setShowNewTicketModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    New Ticket
                  </button>
                </div>
                <div className="space-y-4">
                  {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                      <div key={ticket._id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-semibold">{ticket.subject}</h3>
                            <p className="text-sm text-gray-500">
                              {ticket.orderId ? `Order #${ticket.orderId.substring(0, 8)}` : 'No order attached'}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium
                            ${ticket.status === 'open' ? 'bg-red-100 text-red-700' :
                            ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'}`}>
                            {ticket.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <p className="text-sm text-gray-500">
                            Created: {new Date(ticket.createdAt).toLocaleDateString()}
                          </p>
                          <button
                            onClick={() => handleViewTicketDetails(ticket)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <FiMessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <h3 className="text-gray-500 font-medium text-sm sm:text-base">
                        No support tickets
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="p-4">
                <div className="space-y-4">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification._id} className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{notification.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <div className="bg-gray-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <FiBell className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                      </div>
                      <h3 className="text-gray-500 font-medium text-sm sm:text-base">
                        No notifications
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      {/* Enhanced Add Funds Modal */}
      {showAddFundsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add Funds</h2>
              <button onClick={() => setShowAddFundsModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedPaymentMethod}
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
                >
                  <optgroup label="Fiat Payment">
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </optgroup>
                  <optgroup label="Stablecoins">
                    <option value="usdt">Tether (USDT)</option>
                    <option value="usdc">USD Coin (USDC)</option>
                    <option value="sol">Solana (SOL)</option>
                    <option value="bnb">Binance Coin (BNB)</option>
                  </optgroup>
                </select>
              </div>

              {/* Network Selection for Crypto Payments */}
              {cryptoNetworks[selectedPaymentMethod as keyof typeof cryptoNetworks] && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                  >
                    <option value="">Select Network</option>
                    {cryptoNetworks[selectedPaymentMethod as keyof typeof cryptoNetworks].map((network) => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Crypto Payment Instructions */}
              {selectedPaymentMethod !== 'credit_card' && selectedPaymentMethod !== 'paypal' && selectedPaymentMethod !== 'bank_transfer' && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Payment Instructions</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      1. Send exactly <span className="font-medium">${amount || '0.00'}</span> worth of {selectedPaymentMethod.toUpperCase()}
                    </p>
                    {selectedNetwork && (
                      <>
                        <p className="text-sm text-gray-600">
                          2. Use the following wallet address ({selectedNetwork}):
                        </p>
                        <div className="bg-white p-3 rounded border border-gray-200">
                          <code className="text-sm break-all">
                            {getWalletAddress(selectedPaymentMethod, selectedNetwork)}
                          </code>
                        </div>
                        <p className="text-sm text-gray-600">
                          3. After sending, your balance will be updated within 10-30 minutes
                        </p>
                      </>
                    )}
                  </div>
                  <div className="bg-yellow-50 border border-yellow-100 rounded p-3 mt-3">
                    <p className="text-sm text-yellow-800">
                      ⚠️ Make sure to send only through the selected network. Sending through a different network may result in lost funds.
                    </p>
                  </div>
                </div>
              )}

              {/* Terms and Payment Button */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms">I agree to the terms and conditions</label>
                </div>
                <button
                  onClick={handleAddFunds}
                  disabled={!amount || !agreeToTerms}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedPaymentMethod === 'credit_card' ? 'Continue to Payment' :
                   selectedPaymentMethod === 'paypal' ? 'Pay with PayPal' :
                   'Generate Payment Address'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create Support Ticket</h2>
              <button onClick={() => setShowNewTicketModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order ID (if related)</label>
                <select
                  value={ticketOrderId}
                  onChange={(e) => setTicketOrderId(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select an order (optional)</option>
                  {orders.map(order => (
                    <option key={order._id} value={order._id}>
                      Order #{order._id.substring(0, 8)} - {order.serviceType}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  placeholder="Describe your issue"
                />
              </div>
              <button 
                onClick={submitNewTicket}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Refill Request Modal */}
      {showRefillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Request Refill</h2>
              <button onClick={() => setShowRefillModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                <input
                  type="text"
                  value={refillOrderId}
                  readOnly
                  className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Count</label>
                <input
                  type="number"
                  value={currentCount}
                  onChange={(e) => setCurrentCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter current count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected Count</label>
                <input
                  type="number"
                  value={expectedCount}
                  onChange={(e) => setExpectedCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter expected count"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  value={refillNotes}
                  onChange={(e) => setRefillNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Any additional information"
                />
              </div>
              <button 
                onClick={submitRefillRequest}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Refill Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {showTicketDetailModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Ticket Details</h2>
              <button onClick={() => setShowTicketDetailModal(false)} className="text-gray-500 hover:text-gray-700">
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={selectedTicket.subject}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className={`w-full px-4 py-2 rounded-lg border ${
                  selectedTicket.status === 'open' ? 'bg-red-50 text-red-700 border-red-200' :
                  selectedTicket.status === 'in_progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-green-50 text-green-700 border-green-200'
                }`}>
                  {selectedTicket.status.replace('_', ' ')}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Messages</label>
                <div className="border border-gray-200 rounded-lg p-4 max-h-60 overflow-y-auto">
                  {selectedTicket.messages && selectedTicket.messages.length > 0 ? (
                    selectedTicket.messages.map((msg, index) => (
                      <div key={index} className={`mb-3 p-3 rounded-lg ${
                        msg.sender === 'user' ? 'bg-blue-50 ml-6' : 'bg-gray-50 mr-6'
                      }`}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">
                            {msg.sender === 'user' ? 'You' : 'Support Agent'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No messages in this ticket yet.</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reply</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Type your message here..."
                />
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Reply
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  Close Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;