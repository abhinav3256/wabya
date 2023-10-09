import { useRouter } from 'next/router'

// ** React Imports
import { useState, useEffect } from 'react'

// ** Third Party Styles Imports
import {database,storage} from '../../../../firebaseConfig'
import {ref,
    uploadBytesResumable,
    getDownloadURL } from "firebase/storage"
import { collection, doc, getDoc,addDoc, updateDoc } from 'firebase/firestore'
import { Alert } from 'antd'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {

  const router = useRouter();

  const handleClick = (e) => {

    const inputEl1 = document.querySelector('#current_pass');
    const dummyEl1 = document.querySelector('#dummy1');
    const resultEl1 = document.querySelector('#result1');

    const inputEl2 = document.querySelector('#new_pass');
    const dummyEl2 = document.querySelector('#dummy2');
    const resultEl2 = document.querySelector('#result2');

    const inputEl3 = document.querySelector('#confirm_pass');
    const dummyEl3 = document.querySelector('#dummy3');
    const resultEl3 = document.querySelector('#result3');

      inputEl1.addEventListener('keyup', () => {
      const dummyText1 = Array(inputEl1.value.length).fill('*').join('');
      dummyEl1.innerHTML = dummyText1;
      resultEl1.innerHTML = inputEl1.value;
      })

      inputEl2.addEventListener('keyup', () => {
        const dummyText2 = Array(inputEl2.value.length).fill('*').join('');
        dummyEl2.innerHTML = dummyText2;
        resultEl2.innerHTML = inputEl2.value;
      })

      inputEl3.addEventListener('keyup', () => {
        const dummyText3 = Array(inputEl3.value.length).fill('*').join('');
        dummyEl3.innerHTML = dummyText3;
        resultEl3.innerHTML = inputEl3.value;
      })

  };

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [coachId, setCoachId] = useState('');

  useEffect(() => {

    const coachId = sessionStorage.getItem('coachId')
    setCoachId(coachId);

    if (!coachId) {
      router.push('/coach/login')
    }

}, [coachId])




  const checkCurrentPassword = async (coachId, currentPassword) => {
    const userD = doc(collection(database, 'coaches_user'), coachId);
    const userDoc = await getDoc(userD);
    const userData = userDoc.data();

    return userData.coach_password === currentPassword;
  };

  // function to change password
  const changePassword = async (coachId, newPassword) => {
    const update = doc(collection(database,"coaches_user"),coachId);
    await updateDoc(update, {
      coach_password: newPassword
    });
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !repeatPassword) {
      setErrorMessage("Please fill in all fields.");

      return;
    }

    if (newPassword !== repeatPassword) {
      setErrorMessage("New password and confirm password do not match.");

      return;
    }

    const currentPasswordMatches = await checkCurrentPassword(coachId, currentPassword);
    if (!currentPasswordMatches) {
      setErrorMessage("Current password is incorrect.");

      return;
    }

    await changePassword(coachId, newPassword);
    setErrorMessage("Password changed successfully!");
  };

  const [file, setFile] = useState(null);
  const [showpercent, setshowpercent] = useState(false);
  const [showfile, setshowfile] = useState(false);
  const [percent, setPercent] = useState(0);
  const [filecount, setfilecount] = useState(0);
  
  const [percentage, setpercentage] = useState("%");
  const [fileUrl, setfileUrl] = useState("");
  const [fileName, setfileName] = useState("");
  const [fileType, setfileType] = useState("");
  const resourceRef = collection(database, 'resources');


  const [allFiles, setAllFiles] = useState([]);
  const [murl, setmurl] = useState('https://abhinav19.daily.co/n8qwqVewdGXwVk9dNDzg');

  function handleFileChange(event) {
    console.log('test');
    setFile(event.target.files[0]);
//handleSubmit();
  }

  function handleSubmit() {
    // event.preventDefault();
 
 
     if (file != null) {
      
        console.log(file);
       // Upload the file to Firebase Cloud Storage
      // const storageRef = storage().ref();
       //const fileRef = storageRef.child('files/' + file.name);
       setshowpercent(true);
       let randomString = '';

          const randomNum = Math.floor(Math.random() * 1000);

  // Convert the number to a string and pad it with leading zeros if necessary
  const randomNumber = randomNum.toString().padStart(3, '0');
  console.log(randomNumber);
       randomString +=randomNumber;
  
       // Generate three random letters
       for (let i = 0; i < 3; i++) {
         const randomCode = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
         const randomLetter = String.fromCharCode(randomCode);
         randomString += randomLetter;
         console.log(randomLetter);
       }

    

       const uniqueId = new Date().getTime();
       console.log(uniqueId);
       randomString +=uniqueId;

       console.log(randomString);
     const storageRef = ref(storage, `/resources/`+randomString+``)
       const uploadTask =  uploadBytesResumable(storageRef, file);
       uploadTask.on("state_changed",
     (snapshot) => {
     const percent = Math.round(
     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
         );
 // update progress
         setPercent(percent);
         },
     (err) => console.log(err),
         () => {
     // download url
         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
         console.log(url);
         setfileName(file.name);
         
         setfileType(file.type);
         setfileUrl(url);
         setshowpercent(false);
         setfilecount(filecount + 1);
         setFile(null);
      //   toast.success('File Uploaded!');
     });
     }
     ); 
      
         }
       
     }




     function addInFirebase() {
       
        const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1; // add 1 because months are zero-indexed
const year = today.getFullYear();
        addDoc(resourceRef, {
            resourceURL: fileUrl,
            parentId : coachId,
            fileName : fileName,
            fileType : fileType,
            uploadDate : ''+date+'-'+month+'-'+year,
           
          })
            .then(() => {
              toast.success('File Uploaded')
              //router.push('/client/login')
            })
            .catch((err) => {
              console.error(err);
            })
           
         }


         useEffect(() => {

   

            if (fileUrl != "") {
            addInFirebase();
            }
        
        }, [fileUrl])
 

  return (
    <section className="client-password">
           <ToastContainer/>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3>Upload Notes:</h3>
            <div className="row">
              <div className="col-sm-7">
                <div className='inner-info'>
                <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()} className='form-password'>
                  <div className="row">
                    <div className="col-sm-6">
                      <label>File:</label>
                    </div>
                    <div className="col-sm-6">
                    <label  className="custom-file-upload">
    <i className="fa fa-cloud-upload"></i> choose File
    <input id="file-upload" type="file" onChange={handleFileChange}/>
</label>

{ showpercent ?
    percent  : null}
    { showpercent ?
    "%"  : null}
                       
                    </div>
                  </div>
                 
                  <div className="row">
                    <div className="col-sm-12">
                      <input type="submit" value="save" className='btn btn-save' onClick={handleSubmit} />
                    </div>
                    <div className="col-sm-12">
                      {errorMessage && <Alert message={errorMessage} className='mt-4' type="success"/> }
                    </div>
                  </div>
                </form>
                </div>
              </div>
              <div className="col-sm-5">
                  <figure>
                    <img src="../../images/banner-bg.png" alt="Images Logo" />
                  </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FileUpload
