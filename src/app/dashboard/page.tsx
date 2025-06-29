'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Crown, ArrowRight } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Button } from '@/components/ui/button';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

const barData = [
  { month: 'Jan', revenue: 2380 },
  { month: 'Feb', revenue: 2940 },
  { month: 'Mar', revenue: 4800 },
  { month: 'Apr', revenue: 3908 },
  { month: 'May', revenue: 5200 },
  { month: 'Jun', revenue: 4300 },
];

const chartConfigBar = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--accent))",
  },
};

const pieData = [
  { name: 'apparel', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'electronics', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'home', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'other', value: 278, fill: 'hsl(var(--chart-4))' },
];

const chartConfigPie = {
  value: {
    label: 'Items',
  },
  apparel: {
    label: "Apparel",
    color: "hsl(var(--chart-1))",
  },
  electronics: {
    label: "Electronics",
    color: "hsl(var(--chart-2))",
  },
  home: {
    label: "Home Goods",
    color: "hsl(var(--chart-3))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-4))",
  },
};


const topProducts = [
  { name: 'Classic T-Shirt', sales: '1,200 units' },
  { name: 'Smart Watch', sales: '850 units' },
  { name: 'Cozy Blanket', sales: '600 units' },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-6 overflow-y-auto no-scrollbar">
        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Here’s your snapshot.</h2>
            <p className="text-sm md:text-base text-muted-foreground">You’re doing better than you think.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-4 grid-cols-2">
            <div className="rounded-xl bg-violet-400/20 backdrop-blur-lg border border-violet-400/30 p-4 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-xs sm:text-sm font-medium text-violet-900">Gross Revenue</p>
                <span className="text-violet-900/80 font-bold">₱</span>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-violet-950">₱45,231</p>
              <p className="text-xs text-violet-900/80">+20.1%</p>
            </div>
            <div className="rounded-xl bg-emerald-400/20 backdrop-blur-lg border border-emerald-400/30 p-4 space-y-1">
              <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm font-medium text-emerald-900">Net Profit</p>
                  <TrendingUp className="h-4 w-4 text-emerald-900/80" />
              </div>
              <p className="text-xl sm:text-2xl font-bold text-emerald-950">₱12,124</p>
              <p className="text-xs text-emerald-900/80">+18.3%</p>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="rounded-xl bg-background/30 backdrop-blur-lg border p-4">
              <h3 className="text-base font-semibold mb-1">Income Overview</h3>
              <p className="text-xs text-muted-foreground mb-4">Jan - Jun 2024</p>
              <ChartContainer config={chartConfigBar} className="h-[200px] w-full -ml-4">
                <BarChart accessibilityLayer data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={8}
                    axisLine={false}
                    fontSize={12}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    fontSize={12}
                    tickFormatter={(value) => `₱${value / 1000}k`}
                    stroke="hsl(var(--muted-foreground))"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        hideIndicator 
                        className="bg-background/80 backdrop-blur-md border"
                    />}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
          </motion.div>

          <motion.div variants={itemVariants} className="grid gap-4 grid-cols-1">
              <div className="rounded-xl bg-background/30 backdrop-blur-lg border p-4">
                  <h3 className="text-base font-semibold mb-1">Product Categories</h3>
                  <p className="text-xs text-muted-foreground mb-4">Top categories by sales volume.</p>
                  <ChartContainer config={chartConfigPie} className="w-full h-[150px]">
                    <PieChart accessibilityLayer>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel className="bg-background/80 backdrop-blur-md border" />}
                      />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={30}
                        outerRadius={50}
                        strokeWidth={2}
                        paddingAngle={5}
                        cx="35%"
                      >
                       {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" className="flex-col items-start space-y-1 text-xs" />}
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                      />
                    </PieChart>
                  </ChartContainer>
              </div>
               <div className="rounded-xl bg-background/30 backdrop-blur-lg border p-4">
                  <h3 className="text-base font-semibold mb-1">Top 3 Products</h3>
                  <p className="text-xs text-muted-foreground mb-4">Your best-selling items.</p>
                  <ul className="space-y-4">
                      {topProducts.map((product, index) => (
                      <li key={index} className="flex items-center gap-4">
                          <div className="flex-shrink-0 bg-yellow-400/20 p-2 rounded-full">
                              <Crown className="h-5 w-5 text-yellow-500" />
                          </div>
                          <div>
                          <p className="font-semibold text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.sales}</p>
                          </div>
                      </li>
                      ))}
                  </ul>
              </div>
          </motion.div>
        </motion.div>
      </div>
      <motion.div
        className="p-6 border-t border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          asChild
          className="w-full bg-primary text-primary-foreground rounded-full h-16 text-lg font-semibold hover:bg-primary/90"
        >
          <Link href="/dashboard">
            Let's Go!
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}
