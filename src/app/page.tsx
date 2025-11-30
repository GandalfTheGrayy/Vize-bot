"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Activity, CheckCircle, Clock, UserPlus, Plus, FileText, Zap, AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Link from "next/link";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const dataTrend = [
  { name: "Pzt", value: 12 },
  { name: "Sal", value: 18 },
  { name: "Çar", value: 15 },
  { name: "Per", value: 25 },
  { name: "Cum", value: 20 },
  { name: "Cmt", value: 10 },
  { name: "Paz", value: 5 },
];

export default function DashboardPage() {
  return (
    <motion.div
      className="p-8 space-y-8"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Panel</h2>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/applicants">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 glass border-white/10 hover:bg-white/5 hover:text-emerald-400 transition-colors">
            <UserPlus className="h-6 w-6" />
            <span>Yeni Başvuru</span>
          </Button>
        </Link>
        <Link href="/tasks">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 glass border-white/10 hover:bg-white/5 hover:text-blue-400 transition-colors">
            <Plus className="h-6 w-6" />
            <span>Yeni Görev</span>
          </Button>
        </Link>
        <Link href="/reports">
          <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 glass border-white/10 hover:bg-white/5 hover:text-violet-400 transition-colors">
            <FileText className="h-6 w-6" />
            <span>Raporlar</span>
          </Button>
        </Link>
        <Button variant="outline" className="w-full h-auto py-4 flex flex-col items-center gap-2 glass border-white/10 hover:bg-white/5 hover:text-yellow-400 transition-colors">
          <Zap className="h-6 w-6" />
          <span>Sistem Kontrolü</span>
        </Button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div variants={item} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="glass-card border-none text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Başvuru
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-400">
                +2 geçen aydan beri
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="glass-card border-none text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktif Görevler
              </CardTitle>
              <Activity className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-gray-400">
                Şu an çalışıyor
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="glass-card border-none text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Başarılı Randevu
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-400">
                %100 başarı oranı
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <Card className="glass-card border-none text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Bekleyen
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-gray-400">
                Sırada bekliyor
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Left Column */}
        <div className="col-span-4 space-y-4">
          <motion.div variants={item}>
            <Card className="glass-card border-none text-white h-full">
              <CardHeader>
                <CardTitle>Son Aktiviteler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Ahmet Yılmaz
                      </p>
                      <p className="text-sm text-gray-400">
                        iData Almanya randevusu alındı.
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-emerald-500">Başarılı</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Ayşe Demir
                      </p>
                      <p className="text-sm text-gray-400">
                        VFS Fransa randevu araması başlatıldı.
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-blue-500">İşlemde</div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        Mehmet Kaya
                      </p>
                      <p className="text-sm text-gray-400">
                        Sıraya eklendi.
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-gray-500">Bekliyor</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="glass-card border-none text-white">
              <CardHeader>
                <CardTitle>Haftalık Aktivite Özeti</CardTitle>
              </CardHeader>
              <CardContent className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataTrend}>
                    <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="col-span-3 space-y-4">
          <motion.div variants={item}>
            <Card className="glass-card border-none text-white">
              <CardHeader>
                <CardTitle>Sistem Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">iData Botu</span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">VFS Botu</span>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Proxy Havuzu</span>
                    <span className="text-sm text-emerald-400">12/15 Aktif</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="glass-card border-none text-white">
              <CardHeader>
                <CardTitle>Sistem Bildirimleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-500">Proxy Uyarısı</p>
                      <p className="text-xs text-gray-400">3 proxy sunucusu yanıt vermiyor.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Info className="h-5 w-5 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-500">Bakım Planlandı</p>
                      <p className="text-xs text-gray-400">Bu gece 03:00'te sistem bakımı yapılacak.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-emerald-500">Randevu Açıldı</p>
                      <p className="text-xs text-gray-400">VFS İtalya için yeni slotlar tespit edildi.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
