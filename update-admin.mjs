import fs from 'fs';
const file = 'src/pages/AdminDashboard.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. replace activeTab state
content = content.replace(
  'useState<"overview" | "bookings" | "images" | "gallery" | "settings">(',
  'useState<"overview" | "bookings" | "analytics" | "settings">('
);

// 2. remove stat box
content = content.replace(
  /\{\s*label:\s*"Gallery Images",[\s\S]*?icon:\s*Image,\s*\},/,
  ''
);

// 3. tab buttons
content = content.replace(
  /\{\s*id:\s*"images",\s*label:\s*"Image Manager",\s*icon:\s*Image\s*\},/,
  '{ id: "analytics", label: "Analytics", icon: BarChart3 },'
);
content = content.replace(
  /\{\s*id:\s*"gallery",\s*label:\s*"Gallery",\s*icon:\s*Upload\s*\},/,
  ''
);

// 4. replace Gallery and Image Manager blocks with Analytics block
const analyticsTab = `        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Analytics Dashboard</h2>
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Bookings by Status</h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: 'Pending', count: pendingCount },
                      { name: 'Confirmed', count: approvedCount },
                      { name: 'Cancelled', count: bookings.filter((b) => b.status === "cancelled").length },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="name" stroke="#ffffff" tick={{ fill: '#ffffff', fontSize: 12 }} />
                    <YAxis stroke="#ffffff" tick={{ fill: '#ffffff' }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      itemStyle={{ color: '#8b5cf6' }}
                      cursor={{ fill: '#ffffff10' }}
                    />
                    <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}`;

// Find indices for slicing
const galleryIndex = content.indexOf('{/* Gallery Tab */}');
const settingsIndex = content.indexOf('{/* Settings Tab */}');
if (galleryIndex !== -1 && settingsIndex !== -1 && galleryIndex < settingsIndex) {
    content = content.substring(0, galleryIndex) + analyticsTab + '\n\n        ' + content.substring(settingsIndex);
}

fs.writeFileSync(file, content);
console.log("Successfully updated AdminDashboard.tsx");
