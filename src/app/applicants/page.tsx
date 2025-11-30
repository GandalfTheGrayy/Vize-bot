"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Search, Trash2, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data
const initialApplicants = [
    {
        id: 1,
        name: "Ahmet",
        surname: "Yılmaz",
        passport: "U12345678",
        dob: "1990-01-01",
        status: "Bekliyor",
    },
    {
        id: 2,
        name: "Ayşe",
        surname: "Demir",
        passport: "U87654321",
        dob: "1995-05-15",
        status: "İşlemde",
    },
    {
        id: 3,
        name: "Mehmet",
        surname: "Kaya",
        passport: "U11223344",
        dob: "1988-11-20",
        status: "Tamamlandı",
    },
    {
        id: 4,
        name: "Fatma",
        surname: "Çelik",
        passport: "U55667788",
        dob: "1992-03-10",
        status: "Bekliyor",
    },
    {
        id: 5,
        name: "Ali",
        surname: "Öztürk",
        passport: "U99887766",
        dob: "1985-07-25",
        status: "İşlemde",
    },
    {
        id: 6,
        name: "Zeynep",
        surname: "Arslan",
        passport: "U44332211",
        dob: "1998-09-05",
        status: "Bekliyor",
    },
    {
        id: 7,
        name: "Mustafa",
        surname: "Doğan",
        passport: "U66554433",
        dob: "1991-12-12",
        status: "Tamamlandı",
    },
    {
        id: 8,
        name: "Elif",
        surname: "Yıldız",
        passport: "U22334455",
        dob: "1994-04-18",
        status: "Bekliyor",
    },
];

export default function ApplicantsPage() {
    const [applicants, setApplicants] = useState(initialApplicants);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        tcNo: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        birthPlace: "",
        fatherName: "",
        motherName: "",
        passport: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        passportAuthority: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        job: "",
        travelDateStart: "",
        travelDateEnd: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newApplicant = {
            id: applicants.length + 1,
            ...formData,
            status: "Bekliyor",
        };
        setApplicants([...applicants, newApplicant]);
        setIsOpen(false);
        // Reset form
        setFormData({
            name: "",
            surname: "",
            tcNo: "",
            dob: "",
            gender: "",
            maritalStatus: "",
            nationality: "",
            birthPlace: "",
            fatherName: "",
            motherName: "",
            passport: "",
            passportIssueDate: "",
            passportExpiryDate: "",
            passportAuthority: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            job: "",
            travelDateStart: "",
            travelDateEnd: "",
        });
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Başvurular</h2>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Yeni Kişi Ekle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Yeni Başvuru Sahibi Ekle</DialogTitle>
                            <DialogDescription>
                                Vize başvurusu için gerekli tüm bilgileri eksiksiz giriniz.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 py-4">
                            {/* Kimlik Bilgileri */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Kimlik Bilgileri</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Ad</Label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="surname">Soyad</Label>
                                        <Input id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tcNo">TC Kimlik No</Label>
                                        <Input id="tcNo" name="tcNo" value={formData.tcNo} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dob">Doğum Tarihi</Label>
                                        <Input id="dob" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="gender">Cinsiyet</Label>
                                        <Input id="gender" name="gender" placeholder="E / K" value={formData.gender} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maritalStatus">Medeni Durum</Label>
                                        <Input id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="nationality">Uyruk</Label>
                                        <Input id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="birthPlace">Doğum Yeri</Label>
                                        <Input id="birthPlace" name="birthPlace" value={formData.birthPlace} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fatherName">Baba Adı</Label>
                                        <Input id="fatherName" name="fatherName" value={formData.fatherName} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="motherName">Anne Adı</Label>
                                        <Input id="motherName" name="motherName" value={formData.motherName} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Pasaport Bilgileri */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Pasaport Bilgileri</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="passport">Pasaport No</Label>
                                        <Input id="passport" name="passport" value={formData.passport} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="passportAuthority">Veren Makam</Label>
                                        <Input id="passportAuthority" name="passportAuthority" value={formData.passportAuthority} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="passportIssueDate">Veriliş Tarihi</Label>
                                        <Input id="passportIssueDate" name="passportIssueDate" type="date" value={formData.passportIssueDate} onChange={handleInputChange} required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="passportExpiryDate">Bitiş Tarihi</Label>
                                        <Input id="passportExpiryDate" name="passportExpiryDate" type="date" value={formData.passportExpiryDate} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>

                            {/* İletişim ve Diğer */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">İletişim ve Diğer</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefon</Label>
                                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-posta</Label>
                                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Şehir</Label>
                                        <Input id="city" name="city" value={formData.city} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="job">Meslek</Label>
                                        <Input id="job" name="job" value={formData.job} onChange={handleInputChange} />
                                    </div>
                                    <div className="col-span-2 space-y-2">
                                        <Label htmlFor="address">Adres</Label>
                                        <Input id="address" name="address" value={formData.address} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Seyahat Bilgileri */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Seyahat Bilgileri</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="travelDateStart">Seyahat Başlangıç</Label>
                                        <Input id="travelDateStart" name="travelDateStart" type="date" value={formData.travelDateStart} onChange={handleInputChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="travelDateEnd">Seyahat Bitiş</Label>
                                        <Input id="travelDateEnd" name="travelDateEnd" type="date" value={formData.travelDateEnd} onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            {/* Evraklar */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium border-b pb-2">Evraklar</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="file-passport">Pasaport Fotokopisi</Label>
                                        <Input id="file-passport" type="file" className="cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file-biometric">Biyometrik Fotoğraf</Label>
                                        <Input id="file-biometric" type="file" className="cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file-insurance">Seyahat Sağlık Sigortası</Label>
                                        <Input id="file-insurance" type="file" className="cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file-application">Vize Başvuru Formu</Label>
                                        <Input id="file-application" type="file" className="cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file-flight">Uçak/Otel Rezervasyonu</Label>
                                        <Input id="file-flight" type="file" className="cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file-bank">Banka/Maaş Dökümü</Label>
                                        <Input id="file-bank" type="file" className="cursor-pointer" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="file-idcard">Kimlik Fotokopisi</Label>
                                        <Input id="file-idcard" type="file" className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button type="submit" className="w-full">Kaydet</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">#</TableHead>
                            <TableHead>Ad</TableHead>
                            <TableHead>Soyad</TableHead>
                            <TableHead>Pasaport No</TableHead>
                            <TableHead>Doğum Tarihi</TableHead>
                            <TableHead>Durum</TableHead>
                            <TableHead className="text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {applicants.map((applicant, index) => (
                                <motion.tr
                                    key={applicant.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                                    <TableCell className="font-medium">{applicant.name}</TableCell>
                                    <TableCell>{applicant.surname}</TableCell>
                                    <TableCell>{applicant.passport}</TableCell>
                                    <TableCell>{applicant.dob}</TableCell>
                                    <TableCell>
                                        <span className={
                                            applicant.status === "İşlemde" ? "text-blue-500" :
                                                applicant.status === "Bekliyor" ? "text-gray-500" : "text-green-500"
                                        }>
                                            {applicant.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-500/10">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div >
        </div >
    );
}
