import RegisterForm from '@/components/RegisterForm';

export default function TenantRegisterPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <RegisterForm role="tenant" />
      </div>
    </div>
  );
} 