import RegisterForm from '@/components/RegisterForm';

export default function LandlordRegisterPage() {
  return (
    <div className="login-container">
      <div className="login-card">
        <RegisterForm role="landlord" />
      </div>
    </div>
  );
} 