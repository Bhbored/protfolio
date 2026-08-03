import {
  Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  ArrowRight, ArrowUp, ExternalLink, Home,
  Plus, Pencil, Trash2, Send, Search, Download, Upload,
  Copy, Eye, EyeOff, RotateCcw, RefreshCw,
  MapPin, Phone, Mail, Globe,
  Code, Terminal, Database, Server, Cloud, Shield, Lock,
  GitBranch, Bug, Cpu, Monitor, Smartphone, HardDrive, Network,
  FileCode, FileJson, Braces, Palette, Bot, Zap, Brain,
  Briefcase, Calendar, Clock, History,
  GraduationCap, BookOpen, School, Award, Star, BadgeCheck, Lightbulb,
  Image, Camera, Play, Video,
  Settings, Bell, Heart, Users, Rocket, Sparkles,
  Fingerprint, QrCode, Layers, Wrench,
  AlertCircle, AlertTriangle, CheckCircle, Info, Ban, Loader,
  type LucideIcon,
} from "lucide-react"

const I = {
  Navigation: { Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, ArrowRight, ArrowUp, ExternalLink, Home },
  Actions: { Plus, Pencil, Trash2, Send, Search, Download, Upload, Copy, Eye, EyeOff, RotateCcw, RefreshCw },
  Contact: { MapPin, Phone, Mail, Globe },
  Tech: { Code, Terminal, Database, Server, Cloud, Shield, Lock, GitBranch, Bug, Cpu, Monitor, Smartphone, HardDrive, Network, FileCode, FileJson, Braces, Palette, Bot, Zap, Brain },
  Business: { Briefcase, Calendar, Clock, History },
  Education: { GraduationCap, BookOpen, School, Award, Star, BadgeCheck, Lightbulb },
  Media: { Image, Camera, Play, Video },
  UI: { Settings, Bell, Heart, Users, Rocket, Sparkles, Fingerprint, QrCode, Layers, Wrench },
  Status: { AlertCircle, AlertTriangle, CheckCircle, Info, Ban, Loader },
}

export const icons = I
export type IconCategory = keyof typeof I

export const materialIconMap: Record<number, LucideIcon> = {
  8: Menu,
  9: X,
  4: ChevronRight,
  5: ChevronLeft,
  6: ChevronDown,
  7: ChevronUp,
  10: ExternalLink,
  197: Home,
  13: Plus,
  16: Pencil,
  15: Trash2,
  34: Send,
  20: Search,
  23: Download,
  24: Upload,
  26: Copy,
  28: Eye,
  29: EyeOff,
  18: RefreshCw,
  36: MapPin,
  35: Phone,
  30: Mail,
  38: Globe,
  51: Code,
  52: Terminal,
  58: Database,
  59: Server,
  55: Cloud,
  64: Shield,
  66: Lock,
  133: GitBranch,
  68: Bug,
  53: Cpu,
  73: Monitor,
  74: Smartphone,
  54: HardDrive,
  61: Network,
  194: FileCode,   // HTML
  195: Palette,     // CSS
  81: Braces,      // JavaScript
  196: Bot,         // AI
  215: Zap,        // Bolt
  95: Lightbulb,
  103: Briefcase,
  111: Calendar,
  113: History,
  89: School,
  99: Award,
  100: Star,
  96: CheckCircle,
  116: Image,
  128: Camera,
  122: Play,
  19: Settings,
  32: Bell,
  151: Heart,
  153: Users,
  210: Rocket,
  213: Sparkles,
  225: Fingerprint,
  229: QrCode,
  132: Layers,
  129: Wrench,
  41: AlertCircle,
  40: AlertTriangle,
  42: CheckCircle,
  39: Info,
  49: Ban,
  44: Loader,
}

export function getIcon(id: number): LucideIcon {
  return materialIconMap[id] ?? Code
}

export interface IconOption {
  id: number
  name: string
  Icon: LucideIcon
}

export function getIconOptions(): IconOption[] {
  return Object.entries(materialIconMap)
    .map(([id, Icon]) => ({
      id: Number(id),
      name: Icon.displayName ?? Icon.name ?? String(id),
      Icon,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
