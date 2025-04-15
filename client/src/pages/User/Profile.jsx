import { useState,useEffect } from 'react';
import { FaEdit, FaCamera,FaCircle } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../api/axios';
import Avatar from '../../components/Avatar';
import {toast} from 'react-hot-toast';
const ProfileForm = () => {
  const {userInfor,setUserInfor} = useAuth();
  const [loading, setLoading] = useState(true);
  const [isModified,setisModified] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [bankCard, setBankCard] = useState('');
  const [bankName, setBankName] = useState('');

  const [insuranceId, setInsuranceId] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  useEffect(() => {
    if (userInfor && !isModified) {
      setAvatar(userInfor.avatar);
      setId(userInfor.ID);
      setEmail(userInfor.email || '');
      setLastName(userInfor.Lname);
      setFirstName(userInfor.Fname);
      setDateOfBirth(userInfor.dateofbirth.slice(0,10) || null);
      setPhoneNumber(userInfor.phone_number);
      setBankCard(userInfor.bank_card || '');
      setBankName(userInfor.bank_name || '');
      setInsuranceId(userInfor.insuarance?.number || '');
      setHospitalName(userInfor.insuarance?.hospital || '');
      setHospitalAddress(userInfor.insuarance?.hospital_address || '');
      setExpiryDate(userInfor.insuarance?.expired|| '');
      setLoading(false);
      setisModified(true)
    }
  }, [userInfor]);
  const handleSubmitForm = async () => {
    const formData = {
      ID: id,
      email,
      Lname: lastName,
      Fname: firstName,
      dateofbirth: dateOfBirth,
      phone_number: phoneNumber,
      bank_card: bankCard,
      bank_name: bankName,
      insuarance: {
        number: insuranceId,
        hospital: hospitalName,
        hospital_address: hospitalAddress,
        expired: expiryDate
      }
    }
    try {
      const res = await api.patch('/api/v1/updateinformation',formData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.data.status=="success") {
        setUserInfor({ ...res.data.data });
        localStorage.setItem('user', JSON.stringify(res.data.data));
      }
      toast.success("Update information successfully",{
        duration: 2000
      })

    } catch(err) {
      toast.error(err.message)
    }

  }

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };
  const handleChangeAvatar = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);
  
      try {
        setLoading(true);
        const res = await api.post('/api/v1/uploadavatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUserInfor(res.data.user);
        setAvatar(res.data.imageUrl);
      } catch (error) {
        console.log(error)
        toast.error('Upload failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };



  return (
    <div className="max-w-3xl mt-20 mb-20 mx-auto p-10 bg-white rounded-xl shadow-2xl space-y-8">
      { loading && (
       <div className="absolute top-0 left-0 w-full flex justify-center mt-24 z-50">
       <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
     </div>
       )
      }
      {/* Top Section */}
      <div className="flex items-center gap-6">
        <div className="relative w-48 h-48 mr-10">
          <Avatar avatar={avatar} />
          <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer">
            <FaCamera />
          </label>
          <input onChange = {handleChangeAvatar} type="file" id="avatar-upload" className="hidden" accept="image/*" />
        </div>
        <div>
          <h2 className="text-3xl mb-4 font-bold">{`${lastName} ${firstName}`}</h2>
          <p className="text-green-600 font-medium flex items-center">
            <FaCircle className="mr-2 text-green-600 w-2 h-2" />
            Đang hoạt động
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="relative">
            <label className="block text-gray-600">ID</label>
            <input disabled value={id} className="w-full border p-2 rounded bg-gray-100" />
          </div>
          <div className="relative">
            <label className="block text-gray-600">Email</label>
            <input disabled value={email} className="w-full border p-2 rounded bg-gray-100" />
          </div>
        </div>

        {/* Lname + Fname */}
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-gray-600">Fist Name</label>
            <input  onChange={(e) => handleInputChange(e, setLastName)} value={lastName} className="w-full border p-2 rounded" />
            <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
          </div>
          <div className="relative">
            <label className="block text-gray-600">Last Name</label>
            <input onChange={(e) => handleInputChange(e, setFirstName)} value={firstName} className="w-full border p-2 rounded" />
            <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Ngày sinh + SĐT */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="relative">
            <label className="block text-gray-600">Date of birth</label>
            <input onChange={(e) => handleInputChange(e, setDateOfBirth)} value={dateOfBirth} type="date" className="w-full border p-2 rounded" />
          </div>
          <div className="relative">
            <label className="block text-gray-600">Phone Number</label>
            <input onChange={(e) => handleInputChange(e, setPhoneNumber)} value={phoneNumber} className="w-full border p-2 rounded" />
            <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* BankCard + Bank Name */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="relative">
            <label className="block text-gray-600">Bank number</label>
            <input onChange={(e) => handleInputChange(e, setBankCard)} value={bankCard} className="w-full border p-2 rounded" />
            <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
          </div>
          <div className="relative">
            <label className="block text-gray-600">Bank name</label>
            <input onChange={(e) => handleInputChange(e, setBankName)} value={bankName} className="w-full border p-2 rounded" />
            <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Thông tin bảo hiểm */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800">Insuarance</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-gray-600">Number</label>
              <input onChange={(e) => handleInputChange(e, setInsuranceId)} value={insuranceId} className="w-full border p-2 rounded" />
              <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
            </div>
            <div className="relative">
              <label className="block text-gray-600">Hospital</label>
              <input onChange={(e) => handleInputChange(e, setHospitalName)} value={hospitalName} className="w-full border p-2 rounded" />
              <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
            </div>
            <div className="relative ">
              <label className="block text-gray-600">Address</label>
              <input onChange={(e) => handleInputChange(e, setHospitalAddress)} value={hospitalAddress} className="w-full border p-2 rounded" />
              <FaEdit className="absolute top-8 right-2 text-gray-500 cursor-pointer" />
            </div>
            <div className="relative ">
              <label className="block text-gray-600">Expired Date</label>
              <input onChange={(e) => handleInputChange(e, setExpiryDate)} value={expiryDate} type="date" className="w-full border p-2 rounded" />
            </div>
          </div>
        </div>
        <button
        type='button'
        onClick={handleSubmitForm}
        className="p-3 rounded-md hover:bg-green-50  bg-blue-500 text-white"
        > 
          Submit 
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
