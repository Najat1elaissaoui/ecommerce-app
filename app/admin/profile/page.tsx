"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Settings, 
  Lock, 
  Mail, 
  Phone, 
  Calendar,
  Edit3,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminProfile {
  id: number
  name: string
  email: string
  phone: string
  created_at: string
  last_login: string
  avatar?: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<AdminProfile>({
    id: 1,
    name: "يوسف الإدريسي",
    email: "admin@store.ma",
    phone: "+212612345678",
    created_at: "2024-01-01T00:00:00Z",
    last_login: "2024-01-15T10:00:00Z"
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setProfile({
        ...profile,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone
      })

      setIsEditing(false)
      toast({
        title: "تم تحديث الملف الشخصي",
        description: "تم حفظ التغييرات بنجاح"
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث البيانات",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "خطأ",
        description: "كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقان",
        variant: "destructive"
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "خطأ",
        description: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      })

      toast({
        title: "تم تغيير كلمة المرور",
        description: "تم تحديث كلمة المرور بنجاح"
      })
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير كلمة المرور",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const cancelEdit = () => {
    setEditForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone
    })
    setIsEditing(false)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    // Use Moroccan Arabic locale; fallback to generic Arabic if not supported.
    return date.toLocaleDateString('ar-MA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }

    strength = Object.values(checks).filter(Boolean).length

    if (strength < 2) return { level: "ضعيف", color: "text-red-500" }
    if (strength < 4) return { level: "متوسط", color: "text-yellow-500" }
    return { level: "قوي", color: "text-green-500" }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={profile.avatar} />
          <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
            {profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">الملف الشخصي</h1>
          <p className="text-muted-foreground">إدارة معلوماتك الشخصية وإعدادات الحساب</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            المعلومات الشخصية
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            الأمان وكلمة المرور
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    المعلومات الأساسية
                  </CardTitle>
                  <CardDescription>
                    تحديث معلوماتك الشخصية وبيانات الاتصال
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit3 className="w-4 h-4 mr-1" />
                    تعديل
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">الاسم الكامل</Label>
                    <Input
                      id="name"
                      value={isEditing ? editForm.name : profile.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-muted" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={isEditing ? editForm.email : profile.email}
                        onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className={`pr-10 ${!isEditing ? "bg-muted" : ""}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={isEditing ? editForm.phone : profile.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      className={`pr-10 ${!isEditing ? "bg-muted" : ""}`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-2">
                    <Button type="submit" disabled={loading}>
                      <Save className="w-4 h-4 mr-1" />
                      {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                    </Button>
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      إلغاء
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                معلومات الحساب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">تاريخ إنشاء الحساب</p>
                    <p className="text-sm text-muted-foreground">{formatDate(profile.created_at)}</p>
                  </div>
                </div>
                
                 
               
              </div>
              
              <Separator />
              
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">معرف المستخدم</p>
                  <p className="text-sm text-muted-foreground">#{profile.id}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                تغيير كلمة المرور
              </CardTitle>
              <CardDescription>
                تحديث كلمة المرور لحماية حسابك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="أدخل كلمة المرور الحالية"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="أدخل كلمة المرور الجديدة"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {passwordForm.newPassword && (
                    <div className="flex items-center gap-2 text-sm">
                      <span>قوة كلمة المرور:</span>
                      <span className={getPasswordStrength(passwordForm.newPassword).color}>
                        {getPasswordStrength(passwordForm.newPassword).level}
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="أعد إدخال كلمة المرور الجديدة"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
                    <p className="text-sm text-red-500">كلمة المرور غير متطابقة</p>
                  )}
                </div>

                <Button type="submit" disabled={loading || !passwordForm.currentPassword || !passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirmPassword}>
                  <Lock className="w-4 h-4 mr-1" />
                  {loading ? "جاري التحديث..." : "تحديث كلمة المرور"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                نصائح الأمان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>استخدم كلمة مرور قوية تحتوي على أحرف كبيرة وصغيرة وأرقام ورموز خاصة</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>لا تشارك كلمة المرور الخاصة بك مع أي شخص آخر</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>قم بتغيير كلمة المرور بشكل دوري (كل 3-6 أشهر)</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <p>تأكد من تسجيل الخروج من حسابك عند الانتهاء من العمل</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}