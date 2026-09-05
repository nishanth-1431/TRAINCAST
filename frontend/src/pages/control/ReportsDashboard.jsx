import React, { useEffect, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { createApiClient } from '../../services/apiClient';
import { generateSampleCsv } from '../../data/reportsData';
import { FileText, Download, Calendar, Filter, Search, CheckCircle2, Eye, FileSpreadsheet } from 'lucide-react';
import './control.css';

const ReportsDashboard = () => {
  const { appMode } = useApp();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [divisionFilter, setDivisionFilter] = useState('All');
  const [previewReport, setPreviewReport] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const api = createApiClient(appMode);
        const data = await api.getReports();
        setReports(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [appMode]);

  const handleExportCsv = (report) => {
    const csvContent = generateSampleCsv(report);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${report.id}_${report.title.replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReports = reports.filter(r => {
    if (categoryFilter !== 'All' && r.category !== categoryFilter) return false;
    if (divisionFilter !== 'All' && !r.division.includes(divisionFilter)) return false;
    return true;
  });

  if (loading) return <div className="p-5 text-muted">Loading reports catalog...</div>;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="text-primary-navy" /> Operational Reports & Export Center
          </h1>
          <span className="text-xs text-muted">
            Daily network audits, punctuality variance summaries, and client-side CSV dataset export
          </span>
        </div>
        <button 
          className="btn btn-primary text-xs flex items-center gap-2"
          onClick={() => handleExportCsv(reports[0])}
        >
          <FileSpreadsheet size={14} /> Export Fleet CSV
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card mb-4 p-3 flex justify-between items-center gap-3 flex-wrap">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted font-bold">Category:</span>
          {['All', 'Daily Network Performance', 'Train Delay Summary', 'ETA Prediction Accuracy', 'Section Performance'].map(cat => (
            <button 
              key={cat}
              className={`btn text-xs ${categoryFilter === cat ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 8px' }}
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === 'All' ? 'All Categories' : cat.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-xs text-muted font-bold">Division:</span>
          {['All', 'MAS', 'SA', 'TPJ'].map(d => (
            <button 
              key={d}
              className={`btn text-xs ${divisionFilter === d ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '3px 8px' }}
              onClick={() => setDivisionFilter(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Grid Table */}
      <div className="card p-0 mb-4" style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Report ID & Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Division Scope</th>
              <th>Trains Sampled</th>
              <th>Corridor Delay / MAE</th>
              <th>Punctuality Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map(rep => (
              <tr key={rep.id}>
                <td>
                  <div className="font-bold text-primary-navy">{rep.title}</div>
                  <div className="text-xs text-muted font-mono">{rep.id}</div>
                </td>
                <td>
                  <span className="type-pill">{rep.category}</span>
                </td>
                <td>
                  <span className="text-xs font-mono">{rep.date}</span>
                </td>
                <td>
                  <span className="text-xs font-medium">{rep.division}</span>
                </td>
                <td>
                  <span className="text-xs font-mono">{rep.trainsCount}</span>
                </td>
                <td>
                  <span className="text-xs font-bold text-primary-navy font-mono">{rep.avgDelay}</span>
                </td>
                <td>
                  <span className="badge badge-green text-xs font-mono">{rep.onTimeRate}</span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <button 
                      className="btn btn-secondary text-xs flex items-center gap-1"
                      onClick={() => setPreviewReport(rep)}
                    >
                      <Eye size={12} /> View
                    </button>
                    <button 
                      className="btn btn-primary text-xs flex items-center gap-1"
                      onClick={() => handleExportCsv(rep)}
                    >
                      <Download size={12} /> CSV
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline Report Preview Modal / Drawer */}
      {previewReport && (
        <div className="card p-4 border" style={{ backgroundColor: '#F8FAFC', borderLeft: '4px solid var(--primary-navy)' }}>
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-bold text-sm text-primary-navy">{previewReport.title} ({previewReport.id})</h3>
              <span className="text-xs text-muted">Audited on {previewReport.date} • {previewReport.division}</span>
            </div>
            <div className="flex gap-2">
              <button 
                className="btn btn-primary text-xs flex items-center gap-1"
                onClick={() => handleExportCsv(previewReport)}
              >
                <Download size={12} /> Download CSV
              </button>
              <button 
                className="btn btn-secondary text-xs"
                onClick={() => setPreviewReport(null)}
              >
                Close Preview
              </button>
            </div>
          </div>

          <div className="p-3 bg-main rounded border font-mono text-xs overflow-x-auto">
            <pre style={{ margin: 0 }}>
              {generateSampleCsv(previewReport)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsDashboard;
