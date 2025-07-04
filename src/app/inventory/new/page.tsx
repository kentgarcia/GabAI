'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, DollarSign, Tag, Building, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AddInventoryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    productName: '',
    sku: '',
    quantity: '',
    cost: '',
    supplier: '',
    category: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({...prev, category: value}));
  };

  const isFormValid = formData.productName && formData.quantity && formData.cost;

  const handleAddInventory = () => {
    toast({
      title: `✅ Inventory Updated!`,
      description: `${formData.quantity} units of ${formData.productName} have been added.`,
    });
    router.push('/dashboard');
  };

  return (
    <main className="flex flex-col flex-grow p-6 text-foreground h-screen">
      <header className="flex items-center gap-2 mb-8 -ml-2">
        <Button asChild variant="ghost" size="icon">
          <Link href="/add">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Add Inventory</h1>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ staggerChildren: 0.1 }}
        className="flex-grow overflow-y-auto no-scrollbar -mx-6 px-6 space-y-6"
      >
        <div className="space-y-2">
          <Label htmlFor="productName">Product Name</Label>
          <Input id="productName" placeholder="e.g., Resin Coasters (Set of 4)" value={formData.productName} onChange={handleInputChange} className="bg-background/30 h-12" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Stock Quantity</Label>
            <Input id="quantity" type="number" placeholder="0" value={formData.quantity} onChange={handleInputChange} className="bg-background/30 h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cost">Cost per Item (PHP)</Label>
            <Input id="cost" type="number" placeholder="0.00" value={formData.cost} onChange={handleInputChange} className="bg-background/30 h-12" />
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
             <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full bg-background/30 h-12">
                    <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="fashion">Fashion / Apparel</SelectItem>
                    <SelectItem value="beauty">Health & Beauty</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="home">Home & Living</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier (Optional)</Label>
          <Input id="supplier" placeholder="e.g., Divisoria Crafts" value={formData.supplier} onChange={handleInputChange} className="bg-background/30 h-12" />
        </div>
         <div className="space-y-2">
          <Label htmlFor="sku">SKU (Optional)</Label>
          <Input id="sku" placeholder="e.g., RC-BLUE-04" value={formData.sku} onChange={handleInputChange} className="bg-background/30 h-12" />
        </div>
      </motion.div>

      <div className="pt-8">
        <Button onClick={handleAddInventory} disabled={!isFormValid} className="w-full bg-black text-white rounded-full h-14">
          <Plus className="mr-2" /> Add to Inventory
        </Button>
      </div>
    </main>
  );
}