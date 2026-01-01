"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SubscriptionsHeader from '@/components/subscriptions/SubscriptionsHeader';
import PlanCard, { Plan } from '@/components/subscriptions/PlanCard';
import SuccessModal from '@/components/shared/SuccessModal';
import { Check } from 'lucide-react';

const SubscriptionsPage: React.FC = () => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: '0',
      pricePeriod: '/ forever',
      isCurrent: true,
      features: [
        { text: 'Post up to 3 ads per day' },
        { text: 'Respond to unlimited tasks' },
        { text: 'Basic support' },
        { text: 'Ads expire in 99 minutes' },
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '9.99',
      pricePeriod: '/ per month',
      features: [
        { text: 'Post unlimited ads' },
        { text: 'Priority ad placement' },
        { text: 'Extended ad duration (up to 3 hours)' },
        { text: 'Priority support' },
        { text: 'Analytics dashboard' },
        { text: 'Custom location radius' },
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '29.99',
      pricePeriod: '/ per month',
      features: [
        { text: 'Everything in Pro' },
        { text: 'Team accounts (up to 5 members)' },
        { text: 'API access' },
        { text: 'Dedicated account manager' },
        { text: 'Custom integrations' },
        { text: 'Advanced analytics' },
      ],
    },
  ];

  const handleUpgrade = (planId: string) => {
    setSelectedPlan(planId);
    setIsSuccessModalOpen(true);
  };

  const getPlanName = (planId: string) => {
    return plans.find(p => p.id === planId)?.name || 'Plan';
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white">
        <SubscriptionsHeader />

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-textBlack mb-2">Choose Your Plan</h1>
            <p className="text-textGray text-base">Upgrade to unlock more features</p>
          </div>

          {/* Plan Cards */}
          <div className="space-y-6">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                onUpgrade={handleUpgrade}
              />
            ))}
          </div>
        </div>

        {/* Success Modal */}
        <SuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => {
            setIsSuccessModalOpen(false);
            setSelectedPlan(null);
          }}
          title="Upgrade Successful!"
          description={
            <>
              You have successfully upgraded to the <span className="font-bold">{getPlanName(selectedPlan || '')}</span> plan. 
            
            </>
          }
          buttonText="Got it"
          icon={<Check className="w-10 h-10" strokeWidth={3} />}
        />
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionsPage;

