// Define types
export type ChatComponentData = 
  | { type: 'profit-card'; data: { income: number; expenses: number } }
  | { type: 'invoice-preview'; data: any };

export type ChatPrompt = {
  id: string;
  question: string;
  response: string;
  component?: ChatComponentData;
};

export type ChatCategory = {
  category: string;
  prompts: ChatPrompt[];
};

export const MOCK_INCOME = 30000;
export const MOCK_EXPENSES = 11500;
export const MOCK_PROFIT_THIS_MONTH = MOCK_INCOME - MOCK_EXPENSES;

const formatCurrency = (value: number) => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);


export const chatPrompts: ChatCategory[] = [
  {
    category: 'Business Insights',
    prompts: [
      {
        id: 'get_top_products',
        question: 'What were my top 3 selling products this quarter?',
        response: 'Based on your sales data, your top 3 selling products this quarter were:\n1. Resin Coasters (Set of 4)\n2. Gadget Pro Stand\n3. Vintage T-Shirt (Large)',
      },
      {
        id: 'get_june_expenses',
        question: 'Show a breakdown of my expenses for June.',
        response: 'For June, your expenses were mainly in Product Costs (45%), Marketing (25%), and Platform Fees (20%).',
      },
      {
        id: 'get_last_month_profit',
        question: 'How much profit did I make last month?',
        response: `Your net profit last month was ${formatCurrency(MOCK_PROFIT_THIS_MONTH)}. I've attached a summary card.`,
        component: { type: 'profit-card', data: { income: MOCK_INCOME, expenses: MOCK_EXPENSES } }
      },
    ],
  },
  {
    category: 'Financial Planning',
    prompts: [
      {
        id: 'forecast_income',
        question: 'Forecast my income for next quarter.',
        response: "Based on your current trajectory, I'm forecasting an income of approximately ₱75,000 for the next quarter. Keep up the great work!",
      },
      {
        id: 'offer_promo',
        question: 'Should I offer a discount promo this week?',
        response: "Offering a 10% discount this week could boost your sales by an estimated 15-20%, based on previous trends. It's a good time to attract new customers.",
      },
      {
        id: 'savings_goal',
        question: 'Am I on track with my savings goal?',
        response: "You're doing great! You've saved 80% of your monthly goal with one week left. You're definitely on track.",
      },
    ],
  },
  {
    category: 'Compliance & Filing',
    prompts: [
      {
        id: 'get_tax_deadline',
        question: 'When is my next tax deadline?',
        response: 'Your next quarterly income tax return (BIR Form 1701Q) is due on August 15, 2024.',
      },
      {
        id: 'get_q2_tax_estimate',
        question: 'Generate my Q2 tax estimate.',
        response: `Using the 8% flat tax rate on your Q2 income, your estimated tax due is ₱10,800. Remember, this is an estimate.`,
      },
      {
        id: 'check_receipts',
        question: 'Did I issue receipts for all my invoices?',
        response: "I've checked your records. It looks like you still need to issue a receipt for Invoice #INV-004 to 'Global Ventures'.",
      },
    ],
  },
  {
    category: 'Learning & Support',
    prompts: [
      {
        id: 'how_to_issue_receipt',
        question: 'How do I issue a BIR-compliant receipt?',
        response: "A BIR-compliant receipt needs your registered name, TIN, address, the client's details, a unique serial number, date, description of goods/services, and the amount. You can create one from any transaction you log in GabAI!",
      },
      {
        id: 'explain_tax_types',
        question: 'What’s the difference between 8% tax and graduated tax?',
        response: "The 8% option is a simple, flat tax on your gross income (after the first ₱250,000 annual exemption). The Graduated option (0%-35%) is based on your net income (income minus expenses), which can be better if you have high costs. You can set your preference in Settings.",
      },
      {
        id: 'budgeting_help',
        question: 'Explain how to budget income from multiple platforms.',
        response: 'A great way is to use the "envelope" method. Consolidate your income first, then allocate percentages to different "envelopes" like Expenses (50%), Taxes (15%), Savings (20%), and Personal (15%). GabAI helps by showing you the total income from all your synced platforms.',
      },
    ],
  },
];
