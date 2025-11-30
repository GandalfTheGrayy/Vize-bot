"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from "recharts";
import { motion } from "framer-motion";

const dataByCountry = [
    { name: "Almanya", basvuru: 45, onay: 32 },
    { name: "Fransa", basvuru: 38, onay: 28 },
    { name: "İtalya", basvuru: 30, onay: 25 },
    { name: "Hollanda", basvuru: 25, onay: 18 },
    { name: "Yunanistan", basvuru: 20, onay: 15 },
];

const dataByStatus = [
    { name: "Bekliyor", value: 12, color: "#fbbf24" }, // Amber
    { name: "İşlemde", value: 8, color: "#3b82f6" }, // Blue
    { name: "Tamamlandı", value: 24, color: "#10b981" }, // Emerald
    { name: "Hata", value: 3, color: "#ef4444" }, // Red
];

const dataTrend = [
    { name: "Pzt", islem: 12 },
    { name: "Sal", islem: 18 },
    { name: "Çar", islem: 15 },
    { name: "Per", islem: 25 },
    { name: "Cum", islem: 20 },
    { name: "Cmt", islem: 10 },
    { name: "Paz", islem: 5 },
];

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

export default function ReportsPage() {
    return (
        <motion.div
            className="p-8 space-y-8"
            variants={container}
            initial="hidden"
            animate="show"
        >
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Raporlar ve İstatistikler
                </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <motion.div className="col-span-4" variants={item}>
                    <Card className="glass-card border-none text-white h-[400px]">
                        <CardHeader>
                            <CardTitle>Ülkelere Göre Başvurular</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataByCountry}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#888" />
                                    <YAxis stroke="#888" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="basvuru" name="Başvuru" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="onay" name="Onaylanan" fill="#10b981" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div className="col-span-3" variants={item}>
                    <Card className="glass-card border-none text-white h-[400px]">
                        <CardHeader>
                            <CardTitle>Başvuru Durum Dağılımı</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[320px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dataByStatus}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {dataByStatus.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <motion.div variants={item}>
                <Card className="glass-card border-none text-white h-[350px]">
                    <CardHeader>
                        <CardTitle>Haftalık İşlem Hacmi</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[270px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataTrend}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis dataKey="name" stroke="#888" />
                                <YAxis stroke="#888" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="islem"
                                    name="İşlem Sayısı"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#8b5cf6' }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
}
