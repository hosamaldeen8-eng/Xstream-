import { useEffect, useState } from 'react'
import { Upload, AlertCircle, Check, Clock, Eye, FileText } from 'lucide-react'
import { formatCurrency } from '../../lib/api'
import type { ContentSubmission as ContentSubmissionType } from '../../types'

const statusOrder = ['draft', 'submitted', 'in_review', 'approved'] as const
type Status = typeof statusOrder[number] | 'revision_requested'

function statusConfig(status: string) {
  const map: Record<string, { label: string; color: string; dot: string }> = {
    draft: { label: 'Draft', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', dot: 'bg-gray-400' },
    submitted: { label: 'Submitted', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', dot: 'bg-blue-400' },
    in_review: { label: 'In Review', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' },
    approved: { label: 'Approved', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400' },
    revision_requested: { label: 'Revision Needed', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', dot: 'bg-orange-400' },
  }
  return map[status] || { label: status, color: 'bg-gray-500/20 text-gray-400', dot: 'bg-gray-400' }
}

function platformColor(p: string) {
  const map: Record<string, string> = {
    TikTok: 'bg-pink-500/20 text-pink-400',
    Instagram: 'bg-purple-500/20 text-purple-400',
    YouTube: 'bg-red-500/20 text-red-400',
    X: 'bg-sky-500/20 text-sky-400',
  }
  return map[p] || 'bg-gray-500/20 text-gray-400'
}

function PipelineStep({ step, current }: { step: string; current: string }) {
  const steps = ['draft', 'submitted', 'in_review', 'approved']
  const currentIdx = current === 'revision_requested' ? 1 : steps.indexOf(current)
  const stepIdx = steps.indexOf(step)
  const isDone = stepIdx < currentIdx || current === 'approved'
  const isActive = stepIdx === currentIdx && current !== 'revision_requested'

  return (
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
        isDone ? 'bg-emerald-500 border-emerald-500 text-white' :
        isActive ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400' :
        current === 'revision_requested' && step === 'submitted' ? 'bg-orange-500/20 border-orange-400 text-orange-400' :
        'bg-[#080811] border-[#1a1a2e] text-gray-600'
      }`}>
        {isDone ? <Check className="w-4 h-4" /> : stepIdx + 1}
      </div>
      <p className={`text-xs mt-1 font-medium ${isActive || isDone ? 'text-white' : 'text-gray-600'}`}>
        {step.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
      </p>
    </div>
  )
}

export default function ContentSubmission() {
  const [submissions, setSubmissions] = useState<ContentSubmissionType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:5000/api/submissions')
      .then(r => r.json())
      .then(setSubmissions)
      .catch(() => setSubmissions([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Content Studio</h2>
        <p className="text-gray-400 text-sm mt-1">Manage your content submissions and campaign deliverables</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-[#0f0f1a] border border-[#1a1a2e] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((sub) => {
            const sc = statusConfig(sub.status)
            return (
              <div key={sub.id} className={`bg-[#0f0f1a] border rounded-xl p-6 ${
                sub.status === 'revision_requested' ? 'border-orange-500/30' : 'border-[#1a1a2e]'
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-400/20 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{sub.campaignName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-xs">{sub.brand}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${platformColor(sub.platform)}`}>
                          {sub.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${sc.color}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${sc.dot}`} />
                      {sc.label}
                    </span>
                    <p className="text-emerald-400 font-bold text-lg mt-1">{formatCurrency(sub.payment)}</p>
                  </div>
                </div>

                {/* Pipeline */}
                <div className="flex items-center gap-2 mb-5 px-4">
                  {['draft', 'submitted', 'in_review', 'approved'].map((step, i) => (
                    <div key={step} className="flex items-center flex-1">
                      <PipelineStep step={step} current={sub.status} />
                      {i < 3 && (
                        <div className={`flex-1 h-0.5 mx-1 ${
                          ['submitted', 'in_review', 'approved'].includes(sub.status) && i === 0 ? 'bg-emerald-500' :
                          ['in_review', 'approved'].includes(sub.status) && i === 1 ? 'bg-emerald-500' :
                          sub.status === 'approved' && i === 2 ? 'bg-emerald-500' :
                          'bg-[#1a1a2e]'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Revision Feedback */}
                {sub.status === 'revision_requested' && sub.feedback && (
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-orange-400 text-xs font-semibold mb-1">Revision Requested</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{sub.feedback}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload / Actions */}
                <div className="flex items-center gap-3">
                  {(sub.status === 'draft' || sub.status === 'revision_requested') && (
                    <div className="flex-1 border-2 border-dashed border-[#1a1a2e] hover:border-emerald-500/40 rounded-lg p-4 flex items-center gap-3 cursor-pointer transition-colors group">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 group-hover:bg-emerald-500/20 flex items-center justify-center transition-colors">
                        <Upload className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">Drop video file or click to upload</p>
                        <p className="text-gray-500 text-xs">MP4, MOV up to 2GB</p>
                      </div>
                    </div>
                  )}

                  {sub.status === 'draft' && (
                    <button className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-white text-sm font-semibold transition-all duration-200 shrink-0">
                      Submit for Review
                    </button>
                  )}

                  <div className="ml-auto text-right">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>Due {sub.dueDate}</span>
                    </div>
                    {sub.submittedAt && (
                      <p className="text-gray-600 text-xs mt-0.5">Submitted {sub.submittedAt}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
