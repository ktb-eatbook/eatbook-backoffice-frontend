import React, { useCallback, useState } from 'react';
import { debounce } from 'lodash';

// project
import { RegisterData } from '../../store/UserData.ts';
import { AgeGroupType } from '../../store/types.tsx';

import { post } from '../../api/api.ts';
// css
import { IoIosArrowRoundForward } from 'react-icons/io';
import { Button, Label } from 'flowbite-react';

interface RegisterProps {
  setState: () => void;
}

function Register({ setState }: RegisterProps): React.JSX.Element {
  const [userInfo, setUserInfo] = useState<RegisterData>({
    email: '',
    password: '',
    nickName: '',
    gender: '',
    ageGroup: AgeGroupType.Teens,
  });

  const ageGroupUI: { [key: string]: string } = {
    '10대': AgeGroupType.Teens,
    '20대': AgeGroupType.Twenties,
    '30대': AgeGroupType.Thirties,
    '40대': AgeGroupType.Forties,
    '50대': AgeGroupType.Fifties,
    '60대': AgeGroupType.Sixties,
    '70대': AgeGroupType.Seventies,
    '80대': AgeGroupType.Eighties,
    '90대': AgeGroupType.Nineties,
  };
  const genderBtnUI: { [key: string]: string } = {
    '남자': 'MALE',
    '여자': 'FEMALE',
  };

  // handler
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // api
  const debouncedRegister = useCallback(
    debounce(async (formData) => {
      try {
        await post({ url: 'auth/signUp', data: formData });
        setUserInfo({
          email: '',
          password: '',
          nickName: '',
          gender: '',
          ageGroup: AgeGroupType.Teens,
        })
        alert('회원가입 성공! 관리자의 승인을 기다려주세요');
      } catch (err) {
        console.error('회원가입 요청 실패: ', err);
      }
    }, 200), [],
  );

  const register = () => {
    const formData = new FormData();
    formData.append('data', new Blob([JSON.stringify(userInfo)], { type: 'application/json' }));
    debouncedRegister(formData);
  };

  return (
    <>
      <h2 className='text-5xl font-extrabold text-black mb-8'>Register</h2>
      {/* form 영역 */}
      <section className='flex flex-col gap-5'>
        <div>
          <div className='block'>
            <Label htmlFor='email1' value='ID' />
          </div>
          <input type='email' name='email'
                 className=' block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300'
                 value={userInfo.email}
                 onChange={handleInput}
                 placeholder='abcd@kakao.com' required />
        </div>
        <div>
          <div className='block'>
            <Label htmlFor='password1' value='PASSWORD' />
          </div>
          <input type='password' name='password'
                 className=' block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300'
                 value={userInfo.password}
                 onChange={handleInput}
                 required />
        </div>
        <div>
          <div className='block'>
            <Label htmlFor='name' value='이름' />
          </div>
          <input type='text' name='nickName'
                 className='block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300'
                 value={userInfo.nickName}
                 onChange={handleInput}
                 required />
        </div>
        <div>
          <div className='block'>
            <Label htmlFor='name' value='연령대' />
          </div>
          <select name='ageGroup'
                  className='block w-1/2 p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300'
                  value={userInfo.ageGroup}
                  onChange={(e) => setUserInfo((prev) => ({ ...prev, ageGroup: e.target.value as AgeGroupType }))}
                  required
          >
            {Object.keys(ageGroupUI).map((ageGroup) => (
              <option key={ageGroup} value={ageGroupUI[ageGroup]}>
                {ageGroup}
              </option>
            ))}
          </select>
        </div>
        <div className='gap-10 items-center'>
          <div className='block'>
            <Label htmlFor='name' value='성별' />
          </div>
          <div className='flex w-full space-x-4'>
            {Object.keys(genderBtnUI).map((gender) => (
              <button
                name='gender'
                key={gender}
                type='button'
                onClick={() => setUserInfo((prev) => ({ ...prev, gender: genderBtnUI[gender] }))}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium w-full
                                    ${userInfo.gender === genderBtnUI[gender]
                  ? 'bg-main text-gray-600 border border-gray-300'
                  : 'bg-gray-100 text-gray-900 border border-gray-300'
                } hover:bg-main hover:text-gray-600`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
        <Button className='bg-button-text mt-5 shadow-md' onClick={register}>회원가입</Button>
      </section>
      <p
        className='mt-2 text-sm text-button-text/70 hover:cursor-pointer hover:text-button-text justify-self-center flex items-center gap-1'
        onClick={setState}
      >
        이미 회원이신가요?
        <IoIosArrowRoundForward />
      </p>

    </>
  );
}

export default Register;