import LayoutRegister from "@/components/layout-register";
import RegisterStep1 from "@/components/register-step1";
import RegisterStep2 from "@/components/register-step2";
import RegisterStep3 from "@/components/register-step3";
import RegisterStep4 from "@/components/register-step4";
import RegisterStep5 from "@/components/register-step5";

const Register = () => {
  return (
    <LayoutRegister>
      <RegisterStep1 />
      <RegisterStep2 />
      <RegisterStep3 />
      <RegisterStep4 />
      <RegisterStep5 />
    </LayoutRegister>
  );
};

export default Register;
