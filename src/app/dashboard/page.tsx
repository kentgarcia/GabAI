'use client';

import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, Crown } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 100, damping: 12, mass: 0.5 },
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
    color: "hsl(var(--chart-1))",
  },
};

const pieData = [
  { name: 'apparel', value: 400 },
  { name: 'electronics', value: 300 },
  { name: 'home', value: 200 },
  { name: 'other', value: 278 },
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
    <div className="flex-1 space-y-4 p-6 pt-6 overflow-y-auto no-scrollbar">
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold tracking-tight">Here’s your sales snapshot.</h2>
          <p className="text-muted-foreground">You’re doing better than you think.</p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 grid-cols-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Gross Revenue
              </CardTitle>
              <span className="text-muted-foreground font-bold">₱</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱45,231.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Net Profit
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱12,124.50</div>
              <p className="text-xs text-muted-foreground">
                +18.3% from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Income Overview</CardTitle>
              <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={chartConfigBar} className="h-[250px] w-full">
                <BarChart accessibilityLayer data={barData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => `₱${value / 1000}k`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideIndicator />}
                  />
                  <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants} className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
                <CardHeader>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>Top categories by sales volume.</CardDescription>
                </CardHeader>
                <CardContent className="pb-8">
                  <ChartContainer config={chartConfigPie} className="mx-auto aspect-square h-[250px]">
                    <PieChart accessibilityLayer>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                      />
                      <Pie
                        data={pieData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                      >
                       {pieData.map((entry) => (
                          <Cell key={entry.name} fill={`var(--color-${entry.name})`} />
                        ))}
                      </Pie>
                      <ChartLegend
                        content={<ChartLegendContent nameKey="name" />}
                      />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
            </Card>
             <Card className="lg:col-span-3">
                <CardHeader>
                <CardTitle>Top 3 Products</CardTitle>
                <CardDescription>Your best-selling items this month.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center h-full">
                    <ul className="space-y-6">
                        {topProducts.map((product, index) => (
                        <li key={index} className="flex items-center">
                            <Crown className="h-8 w-8 mr-4 text-yellow-400 flex-shrink-0" />
                            <div>
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.sales}</p>
                            </div>
                        </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
