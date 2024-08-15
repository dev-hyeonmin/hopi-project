import {FormProvider, useForm} from 'react-hook-form';
import {login} from '@/api/auth';
import Button from '@components/actions/Button.tsx';
import Box from '@components/layout/box/Box.tsx';
import Input from '@components/form/Input.tsx';
import {saveAuthToken} from '@/utils/auth.ts';
import {useTranslation} from 'react-i18next';

interface FormProps {
  username: string;
  password: string;
}

const initForm = {
  username: '',
  password: '',
};

const Login = () => {
  const { t } = useTranslation();
  const method = useForm<FormProps>({defaultValues: initForm});
  const {handleSubmit} = method;
  const {mutate: loginMutation} = login('MS-GANGNAM');

  const onSubmit = (data: FormProps) => {
    loginMutation(data, {
      onSuccess: ({data}) => {
        saveAuthToken(data.access_token, data.refresh_token);
      },
      onError: (error: any) => {
        console.log(error);
      },
    });
  };

  return (
    <Box
      verticalAlign={'middle'}
      align={'center'}
      className={'fixed w-full h-full'}>
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box direction="vertical" className={'w-72 gap-1.5'}>
            <Input
              name="username"
              size="large"
              placeholder="아이디"
              rules={{required: '아이디를 입력해주세요.'}}
            />

            <Input
              name="password"
              size="large"
              placeholder="비밀번호"
              type="password"
              rules={{required: '비밀번호를 입력해주세요.'}}
            />
          </Box>

          <Button
            label={t('login.login')}
            skin="primary"
            priority="primary"
            size={'large'}
            type="submit"
            className={'w-full mt-4'}
          />
        </form>
      </FormProvider>
    </Box>
  );
};

export default Login;
