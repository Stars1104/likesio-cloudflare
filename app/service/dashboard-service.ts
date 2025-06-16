import apiClient from './api-client';

// User profile
export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Orders
export const getUserOrders = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/orders/my-orders?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await apiClient.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

export const requestRefill = async (orderId: string) => {
  try {
    const response = await apiClient.post(`/orders/${orderId}/refill`);
    return response.data;
  } catch (error) {
    console.error(`Error requesting refill for order ${orderId}:`, error);
    throw error;
  }
};

export const checkRefillStatus = async (orderId: string) => {
  try {
    const response = await apiClient.get(`/orders/${orderId}/refill-status`);
    return response.data;
  } catch (error) {
    console.error(`Error checking refill status for order ${orderId}:`, error);
    throw error;
  }
};

// Transactions
export const getUserTransactions = async (page = 1, limit = 10) => {
  try {
    const response = await apiClient.get(`/transactions/user?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    throw error;
  }
};

// Add funds
export const getPaymentMethods = async () => {
  try {
    const response = await apiClient.get('/transactions/payment-methods');
    return response.data;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw error;
  }
};

export const addFunds = async (amount: number, paymentMethod: string) => {
  try {
    const response = await apiClient.post('/transactions/add-funds', {
      amount,
      paymentMethod
    });
    return response.data;
  } catch (error) {
    console.error('Error adding funds:', error);
    throw error;
  }
};

export const processCryptoPayment = async (transactionId: string, txHash: string, network: string) => {
  try {
    const response = await apiClient.post('/transactions/process-crypto-payment', {
      transactionId,
      txHash,
      network
    });
    return response.data;
  } catch (error) {
    console.error('Error processing crypto payment:', error);
    throw error;
  }
};

// Support tickets
export const getUserTickets = async () => {
  try {
    const response = await apiClient.get('/tickets');
    return response.data;
  } catch (error) {
    console.error('Error fetching user tickets:', error);
    throw error;
  }
};

export const getTicketById = async (ticketId: string) => {
  try {
    const response = await apiClient.get(`/tickets/${ticketId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ticket ${ticketId}:`, error);
    throw error;
  }
};


export const createTicket = async (data: {
  subject: string;
  message: string;
  orderId?: string;
  priority?: string;
}) => {
  try {
    const response = await apiClient.post('/tickets', data);
    return response.data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export const addMessageToTicket = async (ticketId: string, message: string) => {
  try {
    const response = await apiClient.post(`/tickets/${ticketId}/message`, { message });
    return response.data;
  } catch (error) {
    console.error(`Error adding message to ticket ${ticketId}:`, error);
    throw error;
  }
};

export const closeTicket = async (ticketId: string) => {
  try {
    const response = await apiClient.post(`/tickets/${ticketId}/close`);
    return response.data;
  } catch (error) {
    console.error(`Error closing ticket ${ticketId}:`, error);
    throw error;
  }
};

// Notifications
export const getUserNotifications = async () => {
  try {
    const response = await apiClient.get('/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const response = await apiClient.put(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${notificationId} as read:`, error);
    throw error;
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await apiClient.put('/notifications/read-all');
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw error;
  }
};