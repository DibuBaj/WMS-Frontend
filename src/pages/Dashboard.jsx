import React from "react";
import { Card, CardContent } from "./card";  // ✅ FIXED: Correct path
import { Button } from "./button";  
import { Bell, Truck, Settings, List, Trash2 } from "lucide-react";


const Dashboard = () => {
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <div className="w-64 bg-gray-100 p-4 space-y-4">
      <h2 className="text-xl font-bold">GreenBin</h2>
      <nav className="space-y-2">
        <Button variant="ghost" className="w-full flex justify-start">
          <List className="mr-2" /> Dashboard
        </Button>
        <Button variant="ghost" className="w-full flex justify-start">
          <Trash2 className="mr-2" /> Collections
        </Button>
        <Button variant="ghost" className="w-full flex justify-start">
          <Truck className="mr-2" /> Routes
        </Button>
        <Button variant="ghost" className="w-full flex justify-start">
          <Settings className="mr-2" /> Settings
        </Button>
      </nav>
    </div>

    {/* Main Content */}
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Total Collections</p>
            <p className="text-2xl font-bold">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Waste Collected</p>
            <p className="text-2xl font-bold">856 tons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">Active Routes</p>
            <p className="text-2xl font-bold">42</p>
          </CardContent>
        </Card>
      </div>
    </div>

    </div>
  );
};

export default Dashboard;
