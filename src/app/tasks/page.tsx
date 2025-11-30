"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Play, Pause, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
const initialTasks = [
    {
        id: 1,
        applicant: "Ahmet Yılmaz",
        provider: "iData",
        country: "Almanya",
        type: "Turistik",
        city: "İstanbul",
        status: "Çalışıyor",
    },
    {
        id: 2,
        applicant: "Ayşe Demir",
        provider: "VFS",
        country: "Fransa",
        type: "Ticari",
        city: "Ankara",
        status: "Duraklatıldı",
    },
    {
        id: 3,
        applicant: "Mehmet Kaya",
        provider: "iData",
        country: "İtalya",
        type: "Turistik",
        city: "İzmir",
        status: "Bekliyor",
    },
    {
        id: 4,
        applicant: "Fatma Çelik",
        provider: "VFS",
        country: "Hollanda",
        type: "Aile Ziyareti",
        city: "İstanbul",
        status: "Çalışıyor",
    },
    {
        id: 5,
        applicant: "Ali Öztürk",
        provider: "VFS",
        country: "Yunanistan",
        type: "Turistik",
        city: "İzmir",
        status: "Tamamlandı",
    },
    {
        id: 6,
        applicant: "Zeynep Arslan",
        provider: "iData",
        country: "Almanya",
        type: "Ticari",
        city: "Bursa",
        status: "Bekliyor",
    },
    {
        id: 7,
        applicant: "Mustafa Doğan",
        provider: "VFS",
        country: "Polonya",
        type: "Çalışma",
        city: "Ankara",
        status: "Hata",
    },
    {
        id: 8,
        applicant: "Elif Yıldız",
        provider: "iData",
        country: "İtalya",
        type: "Turistik",
        city: "Antalya",
        status: "Çalışıyor",
    },
];

export default function TasksPage() {
    const [tasks, setTasks] = useState(initialTasks);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        applicant: "",
        provider: "",
        country: "",
        city: "",
        type: "",
        dateStart: "",
        dateEnd: "",
    });

    const getCountries = () => {
        if (formData.provider === "iData") return ["Almanya", "İtalya"];
        if (formData.provider === "VFS") return [
            "Fransa", "Hollanda", "Polonya", "Çekya", "Yunanistan",
            "İsveç", "Norveç", "Danimarka", "Finlandiya",
            "Avusturya", "Belçika", "Kanada", "Rusya", "Bulgaristan"
        ];
        return [];
    };

    const getCities = () => {
        if (formData.provider === "iData") return ["İstanbul", "Ankara", "İzmir", "Bursa", "Gaziantep", "Antalya", "Trabzon"];
        if (formData.provider === "VFS") return ["İstanbul", "Ankara", "İzmir", "Antalya"];
        return [];
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTask = {
            id: tasks.length + 1,
            ...formData,
            status: "Bekliyor",
        };
        setTasks([...tasks, newTask]);
        setIsOpen(false);
        setFormData({
            applicant: "",
            provider: "",
            country: "",
            city: "",
            type: "",
            dateStart: "",
            dateEnd: "",
        });
    };

    const moveTaskUp = (index: number) => {
        if (index === 0) return;
        const newTasks = [...tasks];
        [newTasks[index - 1], newTasks[index]] = [newTasks[index], newTasks[index - 1]];
        setTasks(newTasks);
    };

    const moveTaskDown = (index: number) => {
        if (index === tasks.length - 1) return;
        const newTasks = [...tasks];
        [newTasks[index + 1], newTasks[index]] = [newTasks[index], newTasks[index + 1]];
        setTasks(newTasks);
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Randevu Görevleri</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Yeni Görev Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] bg-card border-border max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Yeni Randevu Görevi</DialogTitle>
                            <DialogDescription>
                                Botun arama yapacağı kriterleri belirleyin.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="applicant">Başvuru Sahibi</Label>
                                <Select onValueChange={(value) => handleSelectChange("applicant", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kişi seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Ahmet Yılmaz">Ahmet Yılmaz</SelectItem>
                                        <SelectItem value="Ayşe Demir">Ayşe Demir</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="provider">Sağlayıcı</Label>
                                <Select onValueChange={(value) => handleSelectChange("provider", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="iData">iData</SelectItem>
                                        <SelectItem value="VFS">VFS Global</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Ülke</Label>
                                <Select onValueChange={(value) => handleSelectChange("country", value)} disabled={!formData.provider}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getCountries().map((country) => (
                                            <SelectItem key={country} value={country}>{country}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">Şehir</Label>
                                <Select onValueChange={(value) => handleSelectChange("city", value)} disabled={!formData.country}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {getCities().map((city) => (
                                            <SelectItem key={city} value={city}>{city}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type">Vize Türü</Label>
                                <Select onValueChange={(value) => handleSelectChange("type", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Turistik">Turistik</SelectItem>
                                        <SelectItem value="Ticari">Ticari</SelectItem>
                                        <SelectItem value="Aile Ziyareti">Aile Ziyareti</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="dateStart">Başlangıç Tarihi</Label>
                                    <Input id="dateStart" name="dateStart" type="date" value={formData.dateStart} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dateEnd">Bitiş Tarihi</Label>
                                    <Input id="dateEnd" name="dateEnd" type="date" value={formData.dateEnd} onChange={handleInputChange} required />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" className="w-full">Görevi Başlat</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px] text-muted-foreground">#</TableHead>
                            <TableHead className="text-muted-foreground">Başvuru Sahibi</TableHead>
                            <TableHead className="text-muted-foreground">Sağlayıcı</TableHead>
                            <TableHead className="text-muted-foreground">Ülke</TableHead>
                            <TableHead className="text-muted-foreground">Şehir</TableHead>
                            <TableHead className="text-muted-foreground">Vize Türü</TableHead>
                            <TableHead className="text-muted-foreground">Durum</TableHead>
                            <TableHead className="text-right text-muted-foreground">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {tasks.map((task, index) => (
                                <motion.tr
                                    key={task.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                                    <TableCell className="font-medium text-foreground">{task.applicant}</TableCell>
                                    <TableCell className="text-foreground">{task.provider || "iData"}</TableCell>
                                    <TableCell className="text-foreground">{task.country}</TableCell>
                                    <TableCell className="text-foreground">{task.city}</TableCell>
                                    <TableCell className="text-foreground">{task.type}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === "Çalışıyor" ? "bg-emerald-500/10 text-emerald-500" :
                                            task.status === "Duraklatıldı" ? "bg-yellow-500/10 text-yellow-500" :
                                                "bg-zinc-500/10 text-zinc-500"
                                            }`}>
                                            {task.status === "Çalışıyor" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />}
                                            {task.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={() => moveTaskUp(index)}
                                                disabled={index === 0}
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                                onClick={() => moveTaskDown(index)}
                                                disabled={index === tasks.length - 1}
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                            {task.status === "Çalışıyor" ? (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10">
                                                    <Pause className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10">
                                                    <Play className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
