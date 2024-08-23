import React from 'react'
import ClockGraph from '../../components/ClockGraph'
import Breadcrumb from '../../components/Breadcrumb';

function WorkTimeTraker() {
    const breadcrumbItems = [
        { text: 'Dashboard', href: '/' },
        { text: 'Wrok Time Traker', href: '/' },
      ];
  return (
    <>
     <div className="p-5">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <ClockGraph/>
    </>
  )
}

export default WorkTimeTraker