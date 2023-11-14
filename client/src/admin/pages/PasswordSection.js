import ChangePassword from "./ChangePassword";

function PasswordSection({ patient }) {
  return (<div className="mt-6">
    <h3 className="text-lg font-medium text-gray-900">Password Settings</h3>
    <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200 mb-2">
      <div className="py-3 flex justify-between text-sm font-medium">
        <dt className="text-gray-500">Password</dt>
        <dd className="text-gray-900">********</dd>
      </div>

    </dl>

    <div className="flex justify-end ">
      <ChangePassword />
    </div>
  </div>)
}

export default PasswordSection;