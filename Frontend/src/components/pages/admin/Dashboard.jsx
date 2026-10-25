import React from "react";

const stats = [
  { label: "Users", value: "1,248" },
  { label: "Categories", value: "24" },
  { label: "Products", value: "386" },
  { label: "Orders", value: "1,024" },
];

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">Admin overview</p>
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">
            Quick look at the main store totals.
          </p>
        </div>
      </div>

      <div className="row g-3">
        {stats.map((item) => (
          <div className="col-12 col-md-6 col-xl-3" key={item.label}>
            <div className="dashboard-stat-card">
              <span className="dashboard-stat-label">{item.label}</span>
              <h3 className="dashboard-stat-value">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
