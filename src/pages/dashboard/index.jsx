import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import SummaryMetrics from './components/SummaryMetrics';
import QuickActionsToolbar from './components/QuickActionsToolbar';
import CreditCardGrid from './components/CreditCardGrid';
import UpcomingPaymentsTimeline from './components/UpcomingPaymentsTimeline';
import RecentActivityFeed from './components/RecentActivityFeed';
import SupabaseTest from 'components/SupabaseTest';

const Dashboard = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  // Mock data initialization
  useEffect(() => {
    const mockCards = [
      {
        id: 1,
        name: "Chase Sapphire Preferred",
        lastFourDigits: "4532",
        currentBalance: 2847.50,
        dueDate: "2025-01-18",
        minimumPayment: 85.00,
        status: "urgent"
      },
      {
        id: 2,
        name: "American Express Gold",
        lastFourDigits: "8901",
        currentBalance: 1256.75,
        dueDate: "2025-01-22",
        minimumPayment: 45.00,
        status: "upcoming"
      },
      {
        id: 3,
        name: "Capital One Venture",
        lastFourDigits: "2345",
        currentBalance: 892.30,
        dueDate: "2025-01-15",
        minimumPayment: 35.00,
        status: "paid"
      },
      {
        id: 4,
        name: "Citi Double Cash",
        lastFourDigits: "6789",
        currentBalance: 3421.80,
        dueDate: "2025-01-25",
        minimumPayment: 102.00,
        status: "upcoming"
      }
    ];

    const mockUpcomingPayments = [
      {
        id: 1,
        cardName: "Chase Sapphire Preferred",
        lastFourDigits: "4532",
        amount: 85.00,
        dueDate: "2025-01-18"
      },
      {
        id: 2,
        cardName: "American Express Gold",
        lastFourDigits: "8901",
        amount: 45.00,
        dueDate: "2025-01-22"
      },
      {
        id: 4,
        cardName: "Citi Double Cash",
        lastFourDigits: "6789",
        amount: 102.00,
        dueDate: "2025-01-25"
      }
    ];

    const mockRecentActivities = [
      {
        id: 1,
        cardName: "Chase Sapphire Preferred",
        description: "Whole Foods Market",
        amount: 127.45,
        category: "groceries",
        timestamp: "2025-01-13T09:30:00",
        type: "transaction"
      },
      {
        id: 2,
        cardName: "American Express Gold",
        description: "Shell Gas Station",
        amount: 52.80,
        category: "gas",
        timestamp: "2025-01-13T08:15:00",
        type: "transaction"
      },
      {
        id: 3,
        cardName: "Capital One Venture",
        description: "Payment Received",
        amount: 892.30,
        category: "payment",
        timestamp: "2025-01-12T14:22:00",
        type: "payment"
      },
      {
        id: 4,
        cardName: "Citi Double Cash",
        description: "Amazon Purchase",
        amount: 89.99,
        category: "shopping",
        timestamp: "2025-01-12T11:45:00",
        type: "transaction"
      },
      {
        id: 5,
        cardName: "Chase Sapphire Preferred",
        description: "Netflix Subscription",
        amount: 15.99,
        category: "entertainment",
        timestamp: "2025-01-11T16:30:00",
        type: "transaction"
      }
    ];

    setCards(mockCards);
    setUpcomingPayments(mockUpcomingPayments);
    setRecentActivities(mockRecentActivities);
  }, []);

  // Calculate summary metrics
  const totalCards = cards?.length;
  const upcomingPaymentsCount = cards?.filter(card => card?.status === 'upcoming' || card?.status === 'urgent')?.length;
  const overdueCount = cards?.filter(card => card?.status === 'urgent')?.length;

  // Event handlers
  const handleAddCard = () => {
    navigate('/add-credit-card');
  };

  const handleViewDetails = (cardId) => {
    navigate(`/card-details?id=${cardId}`);
  };

  const handleAddTransaction = (cardId) => {
    navigate(`/add-transaction?cardId=${cardId}`);
  };

  const handleMarkPaid = (cardId) => {
    setCards(prevCards => 
      prevCards?.map(card => 
        card?.id === cardId 
          ? { ...card, status: 'paid', currentBalance: 0 }
          : card
      )
    );
    
    // Remove from upcoming payments
    setUpcomingPayments(prevPayments => 
      prevPayments?.filter(payment => payment?.id !== cardId)
    );
  };

  const handleBulkReminders = () => {
    // Mock bulk reminder functionality
    alert(`Sending payment reminders for ${upcomingPaymentsCount} upcoming payments`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SupabaseTest></SupabaseTest>
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <Breadcrumb />
          <ContextualActionBar />
          
          <QuickActionsToolbar 
            onAddCard={handleAddCard}
            onBulkReminders={handleBulkReminders}
          />
          
          <SummaryMetrics 
            totalCards={totalCards}
            upcomingPayments={upcomingPaymentsCount}
            overdueCount={overdueCount}
          />
          
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Content - Credit Cards */}
            <div className="xl:col-span-2">
              <CreditCardGrid 
                cards={cards}
                onViewDetails={handleViewDetails}
                onAddTransaction={handleAddTransaction}
                onMarkPaid={handleMarkPaid}
              />
            </div>
            
            {/* Right Panel - Timeline and Activity */}
            <div className="space-y-6">
              <UpcomingPaymentsTimeline payments={upcomingPayments} />
              <RecentActivityFeed activities={recentActivities} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;