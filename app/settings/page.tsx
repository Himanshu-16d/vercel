import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <main className="container py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Settings</h1>

        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>Change your password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>LinkedIn Integration</CardTitle>
                <CardDescription>Connect your LinkedIn account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connect to find jobs and import profile data</p>
                  </div>
                  <Button>Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Other Integrations</CardTitle>
                <CardDescription>Connect other services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Indeed</p>
                    <p className="text-sm text-muted-foreground">Connect to find more job opportunities</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Google Drive</p>
                    <p className="text-sm text-muted-foreground">Connect to store and access your resumes</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Manage your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive emails about new job matches</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Job Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified about new jobs matching your profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of job opportunities</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Manage your privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Profile Visibility</p>
                    <p className="text-sm text-muted-foreground">Make your profile visible to recruiters</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-muted-foreground">
                      Allow us to collect usage data to improve our services
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
