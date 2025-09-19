import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePage = () => {
  const {authUser, updateProfile} = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  // IF USER CANNOT SELECT ANY IMAGE 
  if (!selectedImage) {
    await updateProfile({ fullName: name, bio })
    .then(() => navigate('/'))
    .catch(err => console.error(err));
    return;
  }

  // IF USER SELECT AN IMAGE THEN WHAT TO DO
  const reader = new FileReader();
  reader.onload = async () => {
    const base64Image = reader.result;
    await updateProfile({ profilePic: base64Image, fullName: name, bio })
    .then(() => navigate('/'))
    .catch(err => console.error(err));
  };
  reader.readAsDataURL(selectedImage);
  return;

};

  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className='w-5/6  max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3>

          {/* PROFILE PICTURE TO UPDATE */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer'>
            <input onChange={(e) => { setSelectedImage(e.target.files[0]) }} type="file" id='avatar' accept='.png,.jpg,.jpeg' hidden />
            <img src={selectedImage ? URL.createObjectURL(selectedImage) : assets.avatar_icon} alt="" className={`w-12 h-12 ${selectedImage && 'rounded-full'}`} />
            Edit Profile Picture
          </label>

          {/* NAME INPUT FOR UPDATING EXISTING NAME */}
          <input
            onChange={(e) => { setName(e.target.value) }}
            value={name}
            type="text"
            required
            placeholder='Your name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' />

          {/* BIO INPUT FOR UPDATING EXISTING BIO */}
          <textarea
            onChange={(e) => { setBio(e.target.value) }}
            value={bio}
            placeholder='write profile bio'
            required
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'>
          </textarea>

          {/* SAVE BUTTON TO UPDATE */}
          <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600  text-white p-2 rounded-full text-lg cursor-pointer'>Save</button>

        </form>

        {/* IMAGE THAT USER SETS */}
        <img src={authUser?.profilePic || assets.logo_icon} className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10  ${selectedImage && 'rounded-full'}`} alt="" />
      </div>
    </div>
  )
}

export default ProfilePage