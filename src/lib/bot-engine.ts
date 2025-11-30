import { EventEmitter } from 'events';

export interface Task {
    id: number;
    applicant: string;
    provider: "iData" | "VFS";
    country: string;
    city: string;
    type: string;
    dateStart: string;
    dateEnd: string;
    status: "Bekliyor" | "Çalışıyor" | "Duraklatıldı" | "Tamamlandı" | "Hata";
}

export interface Proxy {
    id: number;
    ip: string;
    port: string;
    protocol: "HTTP" | "HTTPS" | "SOCKS4" | "SOCKS5";
    status: "Aktif" | "Pasif" | "Hata";
}

export interface Settings {
    checkInterval: number; // seconds
    maxRetries: number;
    notificationEnabled: boolean;
    telegramToken?: string;
    telegramChatId?: string;
}

export class BotEngine extends EventEmitter {
    private tasks: Map<number, Task>;
    private activeTasks: Set<number>;
    private settings: Settings;
    private proxies: Proxy[];

    constructor() {
        super();
        this.tasks = new Map();
        this.activeTasks = new Set();
        this.proxies = [];
        this.settings = {
            checkInterval: 60,
            maxRetries: 3,
            notificationEnabled: true
        };
    }

    public updateSettings(newSettings: Partial<Settings>) {
        this.settings = { ...this.settings, ...newSettings };
        this.emit('settingsUpdated', this.settings);
    }

    public setProxies(proxies: Proxy[]) {
        this.proxies = proxies;
    }

    public addTask(task: Task) {
        this.tasks.set(task.id, task);
        this.emit('taskAdded', task);
    }

    public removeTask(taskId: number) {
        if (this.activeTasks.has(taskId)) {
            this.stopTask(taskId);
        }
        this.tasks.delete(taskId);
        this.emit('taskRemoved', taskId);
    }

    public async startTask(taskId: number) {
        const task = this.tasks.get(taskId);
        if (!task) throw new Error("Task not found");

        if (this.activeTasks.has(taskId)) return;

        task.status = "Çalışıyor";
        this.activeTasks.add(taskId);
        this.emit('taskStarted', taskId);
        this.emit('taskUpdated', task);

        // Simulate bot activity
        this.runTaskLoop(taskId);
    }

    public stopTask(taskId: number) {
        const task = this.tasks.get(taskId);
        if (!task) return;

        if (this.activeTasks.has(taskId)) {
            this.activeTasks.delete(taskId);
            task.status = "Duraklatıldı";
            this.emit('taskStopped', taskId);
            this.emit('taskUpdated', task);
        }
    }

    private async runTaskLoop(taskId: number) {
        while (this.activeTasks.has(taskId)) {
            try {
                console.log(`Checking appointment for task ${taskId}...`);
                // Placeholder for actual checking logic
                // 1. Select proxy
                // 2. Connect to provider (iData/VFS)
                // 3. Check slots

                await new Promise(resolve => setTimeout(resolve, this.settings.checkInterval * 1000));
            } catch (error) {
                console.error(`Error in task ${taskId}:`, error);
                // Handle retries or pause task on error
            }
        }
    }
}

// Singleton instance
export const botEngine = new BotEngine();
