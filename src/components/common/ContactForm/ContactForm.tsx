/**
 * ContactForm Component
 * Shared contact form with reCAPTCHA
 */
import type { ChangeEvent, FormEvent, ReactElement } from 'react';
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useLocalizedData } from '../../../hooks/useLocalizedData';
import useLanguageStore from '../../../store/languageStore';

// Netlify Functions API URL (set in .env as VITE_CONTACT_API_URL)
const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL || '';
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  inquiryType: string;
  message: string;
  timestamp: string;
  captchaToken?: string | null;
}

function ContactForm(): ReactElement {
  const { language } = useLanguageStore();
  const data = useLocalizedData();

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    company: '',
    email: '',
    inquiryType: 'service',
    message: '',
    timestamp: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error' | 'captcha-required'
  >('idle');

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Check for reCAPTCHA
    if (RECAPTCHA_SITE_KEY && !captchaToken) {
      setSubmitStatus('captcha-required');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const submitData: ContactFormData = {
        ...formData,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...submitData, captchaToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          company: '',
          email: '',
          inquiryType: 'service',
          message: '',
          timestamp: '',
        });
        setCaptchaToken(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
      } else {
        throw new Error(result.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-dark p-8 rounded-2xl border border-gray-800 flex flex-col">
      <form
        className="space-y-5 flex flex-col flex-1"
        onSubmit={handleFormSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              {data.contact.form.name}
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition"
              placeholder={data.contact.form.namePlaceholder}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mb-2">
              {data.contact.form.company}
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition"
              placeholder={data.contact.form.companyPlaceholder}
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">
            {data.contact.form.email}
          </label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition"
            placeholder={data.contact.form.emailPlaceholder}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">
            {data.contact.form.type}
          </label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition appearance-none cursor-pointer"
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleInputChange}
          >
            {data.contact.form.typeOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="block text-gray-400 text-sm mb-2">
            {data.contact.form.message}
          </label>
          <textarea
            className="w-full flex-1 min-h-[100px] bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ai-blue focus:ring-1 focus:ring-ai-blue transition resize-none"
            placeholder={data.contact.form.messagePlaceholder}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        {/* reCAPTCHA */}
        {RECAPTCHA_SITE_KEY && (
          <div className="space-y-2">
            <label className="block text-gray-400 text-sm">
              {language === 'ko' ? '보안 인증' : 'Security Verification'}
            </label>
            <div
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                captchaToken
                  ? 'border-green-500/50 bg-green-500/10'
                  : 'border-gray-700 bg-gray-800/50'
              }`}
            >
              {/* reCAPTCHA Widget */}
              <div className="mb-3">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setCaptchaToken(token)}
                  onExpired={() => setCaptchaToken(null)}
                  theme="dark"
                  size="normal"
                />
              </div>

              {/* Status Indicator */}
              {captchaToken ? (
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="material-symbols-outlined text-base">
                    verified
                  </span>
                  {language === 'ko' ? '인증 완료' : 'Verification Complete'}
                </div>
              ) : (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="material-symbols-outlined text-base">
                    security
                  </span>
                  {language === 'ko'
                    ? '위의 체크박스를 클릭해주세요'
                    : 'Please check the box above'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Success/Error Messages */}
        {submitStatus === 'success' && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">
              check_circle
            </span>
            {language === 'ko'
              ? '문의가 성공적으로 전송되었습니다!'
              : 'Your inquiry has been sent successfully!'}
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {language === 'ko'
              ? '전송에 실패했습니다. 다시 시도해주세요.'
              : 'Failed to send. Please try again.'}
          </div>
        )}
        {submitStatus === 'captcha-required' && (
          <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-100 dark:border-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">warning</span>
            {language === 'ko'
              ? '보안 인증(CAPTCHA)을 완료해주세요.'
              : 'Please complete the security verification (CAPTCHA).'}
          </div>
        )}

        <button
          className="w-full bg-ai-blue hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="material-symbols-outlined text-sm animate-spin">
                sync
              </span>
              {language === 'ko' ? '전송 중...' : 'Sending...'}
            </>
          ) : (
            <>
              {data.contact.form.submit}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
