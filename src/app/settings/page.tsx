"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Trash2, Save, Shield, Bell, Network, Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
    // Proxy State
    const [proxies, setProxies] = useState([
        { id: 1, ip: "192.168.1.1", port: "8080", user: "user1", pass: "***", status: "Aktif" },
    ]);
    const [newProxy, setNewProxy] = useState({ ip: "", port: "", user: "", pass: "" });

    // Captcha State
    const [captchaConfig, setCaptchaConfig] = useState({
        service: "2captcha",
        apiKey: "",
        enabled: true,
    });

    // Notification State
    const [notifications, setNotifications] = useState({
        telegramEnabled: false,
        telegramToken: "",
        telegramChatId: "",
        emailEnabled: false,
        emailAddress: "",
    });

    // Behavior State
    const [behavior, setBehavior] = useState({
        requestDelay: 5000,
        retryCount: 3,
        headless: true,
    });

    const handleAddProxy = () => {
        if (newProxy.ip && newProxy.port) {
            setProxies([...proxies, { id: Date.now(), ...newProxy, status: "Kontrol Ediliyor..." }]);
            setNewProxy({ ip: "", port: "", user: "", pass: "" });
        }
    };

    const handleDeleteProxy = (id: number) => {
        setProxies(proxies.filter(p => p.id !== id));
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ayarlar</h2>
                    <p className="text-muted-foreground">Bot yapılandırması ve tercihleri.</p>
                </div>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Tümünü Kaydet
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">
                        <SettingsIcon className="mr-2 h-4 w-4" /> Genel
                    </TabsTrigger>
                    <TabsTrigger value="proxies">
                        <Network className="mr-2 h-4 w-4" /> Proxy Yönetimi
                    </TabsTrigger>
                    <TabsTrigger value="captcha">
                        <Shield className="mr-2 h-4 w-4" /> Captcha
                    </TabsTrigger>
                    <TabsTrigger value="notifications">
                        <Bell className="mr-2 h-4 w-4" /> Bildirimler
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Davranış Ayarları</CardTitle>
                            <CardDescription>Botun çalışma şeklini özelleştirin.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="requestDelay">İstek Gecikmesi (ms)</Label>
                                    <Input
                                        id="requestDelay"
                                        type="number"
                                        value={behavior.requestDelay}
                                        onChange={(e) => setBehavior({ ...behavior, requestDelay: parseInt(e.target.value) })}
                                    />
                                    <p className="text-xs text-muted-foreground">Her istek arasında beklenecek süre.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="retryCount">Tekrar Deneme Sayısı</Label>
                                    <Input
                                        id="retryCount"
                                        type="number"
                                        value={behavior.retryCount}
                                        onChange={(e) => setBehavior({ ...behavior, retryCount: parseInt(e.target.value) })}
                                    />
                                    <p className="text-xs text-muted-foreground">Hata durumunda kaç kez tekrar deneneceği.</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="headless"
                                    checked={behavior.headless}
                                    onCheckedChange={(checked) => setBehavior({ ...behavior, headless: checked })}
                                />
                                <Label htmlFor="headless">Arka Planda Çalıştır (Headless Mode)</Label>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Proxy Settings */}
                <TabsContent value="proxies">
                    <Card>
                        <CardHeader>
                            <CardTitle>Proxy Listesi</CardTitle>
                            <CardDescription>IP engellemelerini aşmak için proxy kullanın.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-5 gap-2 items-end">
                                <div className="space-y-2">
                                    <Label>IP Adresi</Label>
                                    <Input
                                        placeholder="192.168.1.1"
                                        value={newProxy.ip}
                                        onChange={(e) => setNewProxy({ ...newProxy, ip: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Port</Label>
                                    <Input
                                        placeholder="8080"
                                        value={newProxy.port}
                                        onChange={(e) => setNewProxy({ ...newProxy, port: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Kullanıcı Adı</Label>
                                    <Input
                                        placeholder="Opsiyonel"
                                        value={newProxy.user}
                                        onChange={(e) => setNewProxy({ ...newProxy, user: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Şifre</Label>
                                    <Input
                                        type="password"
                                        placeholder="Opsiyonel"
                                        value={newProxy.pass}
                                        onChange={(e) => setNewProxy({ ...newProxy, pass: e.target.value })}
                                    />
                                </div>
                                <Button onClick={handleAddProxy}>
                                    <Plus className="mr-2 h-4 w-4" /> Ekle
                                </Button>
                            </div>

                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]">#</TableHead>
                                            <TableHead>IP:Port</TableHead>
                                            <TableHead>Kullanıcı</TableHead>
                                            <TableHead>Durum</TableHead>
                                            <TableHead className="text-right">İşlem</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {proxies.map((proxy, index) => (
                                            <TableRow key={proxy.id}>
                                                <TableCell className="font-medium text-muted-foreground">{index + 1}</TableCell>
                                                <TableCell>{proxy.ip}:{proxy.port}</TableCell>
                                                <TableCell>{proxy.user || "-"}</TableCell>
                                                <TableCell>
                                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500">
                                                        {proxy.status}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:text-red-400"
                                                        onClick={() => handleDeleteProxy(proxy.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Captcha Settings */}
                <TabsContent value="captcha">
                    <Card>
                        <CardHeader>
                            <CardTitle>Captcha Çözücü</CardTitle>
                            <CardDescription>Otomatik doğrulama kodlarını çözmek için servis yapılandırması.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2 mb-4">
                                <Switch
                                    id="captcha-enabled"
                                    checked={captchaConfig.enabled}
                                    onCheckedChange={(checked) => setCaptchaConfig({ ...captchaConfig, enabled: checked })}
                                />
                                <Label htmlFor="captcha-enabled">Captcha Çözücü Aktif</Label>
                            </div>
                            <div className="space-y-2">
                                <Label>Servis Sağlayıcı</Label>
                                <div className="flex gap-4">
                                    <Button
                                        variant={captchaConfig.service === "2captcha" ? "default" : "outline"}
                                        onClick={() => setCaptchaConfig({ ...captchaConfig, service: "2captcha" })}
                                    >
                                        2Captcha
                                    </Button>
                                    <Button
                                        variant={captchaConfig.service === "anticaptcha" ? "default" : "outline"}
                                        onClick={() => setCaptchaConfig({ ...captchaConfig, service: "anticaptcha" })}
                                    >
                                        Anti-Captcha
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apiKey">API Anahtarı</Label>
                                <Input
                                    id="apiKey"
                                    type="password"
                                    value={captchaConfig.apiKey}
                                    onChange={(e) => setCaptchaConfig({ ...captchaConfig, apiKey: e.target.value })}
                                    placeholder="API Key giriniz..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notification Settings */}
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bildirim Ayarları</CardTitle>
                            <CardDescription>Randevu bulunduğunda nasıl haberdar olmak istersiniz?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Telegram */}
                            <div className="space-y-4 border-b pb-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Telegram Bildirimleri</Label>
                                        <p className="text-sm text-muted-foreground">Bot üzerinden anlık mesaj alın.</p>
                                    </div>
                                    <Switch
                                        checked={notifications.telegramEnabled}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, telegramEnabled: checked })}
                                    />
                                </div>
                                {notifications.telegramEnabled && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="tgToken">Bot Token</Label>
                                            <Input
                                                id="tgToken"
                                                value={notifications.telegramToken}
                                                onChange={(e) => setNotifications({ ...notifications, telegramToken: e.target.value })}
                                                placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tgChatId">Chat ID</Label>
                                            <Input
                                                id="tgChatId"
                                                value={notifications.telegramChatId}
                                                onChange={(e) => setNotifications({ ...notifications, telegramChatId: e.target.value })}
                                                placeholder="-100123456789"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">E-posta Bildirimleri</Label>
                                        <p className="text-sm text-muted-foreground">Önemli güncellemeleri e-posta ile alın.</p>
                                    </div>
                                    <Switch
                                        checked={notifications.emailEnabled}
                                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailEnabled: checked })}
                                    />
                                </div>
                                {notifications.emailEnabled && (
                                    <div className="space-y-2">
                                        <Label htmlFor="emailAddr">E-posta Adresi</Label>
                                        <Input
                                            id="emailAddr"
                                            type="email"
                                            value={notifications.emailAddress}
                                            onChange={(e) => setNotifications({ ...notifications, emailAddress: e.target.value })}
                                            placeholder="ornek@email.com"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
