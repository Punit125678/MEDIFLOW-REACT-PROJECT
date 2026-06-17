import React from 'react'
import { useParams } from 'react-router-dom'
import PatientDetailsHeader from './PatientDetailsHeader';


// console.log(id);


function PatientDetails() {
  const { id } = useParams();
  return (
    <div className='flex h-full w-full flex-col gap-5 overflow-hidden rounded-2xl bg-slate-50 p-4 shadow-2xl shadow-slate-200'>
      <PatientDetailsHeader id={id} />
      <main className='min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>

        <div className='grid h-[40%] w-full gap-4 lg:grid-cols-[1.5fr_1fr]'>
          <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <h2 className='text-lg font-extrabold text-slate-900'>Clinical Summary</h2>
            
            <p className='mt-2 text-sm text-slate-500'>Diagnosis, treatment notes, and visit summary can be shown here.</p>

          </div>
          <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
            <h2 className='text-lg font-extrabold text-slate-900'>Quick Actions</h2>
            <p className='mt-2 text-sm text-slate-500'>Add update, print report, or manage appointments from this area.</p>

          </div>

        </div>
        <div className='mt-4 h-[calc(60%-1rem)] rounded-2xl border border-slate-200 bg-slate-50 p-4'>
          <h2 className='text-lg font-extrabold text-slate-900'>Patient Timeline</h2>
          <p className='mt-2 text-sm text-slate-500'>Previous visits, prescriptions, and appointment history can be listed here.</p>
        </div>
      </main>
    </div>
  )
}

export default PatientDetails
