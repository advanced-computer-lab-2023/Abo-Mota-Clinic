

function EmergencyContactCard({patient})
{

    return (<div className="mt-6">
    <h3 className="text-lg font-medium text-gray-900">Emergency Contact</h3>
    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
      <div className="py-3 flex justify-between text-sm font-medium">
        <dt className="text-gray-500">Name</dt>
        <dd className="text-gray-900">{patient.emergencyContact.name}</dd>
      </div>
      <div className="py-3 flex justify-between text-sm font-medium">
        <dt className="text-gray-500">Mobile</dt>
        <dd className="text-gray-900">{patient.emergencyContact.mobile}</dd>
      </div>
      <div className="py-3 flex justify-between text-sm font-medium">
        <dt className="text-gray-500">Relation</dt>
        <dd className="text-gray-900">{patient.emergencyContact.relation}</dd>
      </div>
    </dl>
  </div>)
}

export default EmergencyContactCard;