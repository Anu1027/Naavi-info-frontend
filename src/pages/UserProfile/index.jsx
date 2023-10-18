import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../accDashbaoard/accDashboard.scss";
import { useStore } from "../../components/store/store.ts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Dashsidebar from "../../components/dashsidebar/dashsidebar";
import {
  GetFollowersPerAccount,
  GetCategoriesAcc,
  GetAllCustomerLicenses,
  GetLogServices,
  GetAllCurrencies,
  CreatePopularService,
  CheckStatusNaaviProfile,
} from "../../services/accountant";
import * as jose from "jose";
import { LoadingAnimation1 } from "../../components/LoadingAnimation1";
import {
  InputDivsCheck,
  InputDivsTextArea1,
  InputDivsWithMT,
  InputDivsWithColorCode,
} from "../../components/createAccountant/CreatePlanB";
import {
  ImageUploadDivProfilePic1,
  InputDivsCheckFunctionality,
  InputDivsCheckFunctionality1,
  ImageUploadDivCoverPic1,
  ImageUploadProfilePic2,
  ImageUploadDivProfilePic,
  ImageUploadDivCoverPic,
} from "../accProfile/AccProfile";

// images
import searchic from "../../static/images/dashboard/searchic.svg";
import downarrow from "../../static/images/dashboard/downarrow.svg";
import uploadv from "../../static/images/dashboard/uploadv.svg";
import profile from "../../static/images/dashboard/profile.svg";
import closepop from "../../static/images/dashboard/closepop.svg";
import profilea from "../../static/images/dashboard/profilea.svg";
import support from "../../static/images/dashboard/support.svg";
import settings from "../../static/images/dashboard/settings.svg";
import sidearrow from "../../static/images/dashboard/sidearrow.svg";
import logout from "../../static/images/dashboard/logout.svg";
import upgif from "../../static/images/dashboard/upgif.gif";
import lg1 from "../../static/images/login/lg1.svg";
import close from "../../images/close.svg";
import colorArrow from "../../images/colorArrow.svg";
import edit from "../../images/edit.svg";
import downArrow from "../../images/downArrow.svg";
import upArrow from "../../images/upArrow.svg";

const UserProfile = () => {
  const { accsideNav, setaccsideNav, ispopular, setispopular, setsideNav } =
    useStore();
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchaseLoading, setIsPurchaseLoading] = useState(false);
  const [isCatoading, setIsCatLoading] = useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [followCount, setfollowCount] = useState(0);
  const [followData, setfollowData] = useState([]);
  const [coverImageS3url, setCoverImageS3url] = useState("");
  const [pstep, setpstep] = useState(1);
  const [selectNew, setselectNew] = useState("");
  const [billingType, setbillingType] = useState("");
  const [categoriesData, setcategoriesData] = useState([]);
  const [purchaseData, setPurchaseData] = useState([]);
  const [selectCategory, setselectCategory] = useState("");
  const [serviceNameInput, setServiceNameInput] = useState("");
  const [serviceCodeInput, setServiceCodeInput] = useState("");
  const [productLabel, setProductLabel] = useState("");
  const [serviceTagline, setServiceTagline] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [showDrop, setShowDrop] = useState(false);
  const [isCurrencies, setIsCurrencies] = useState(false);
  const [allCurrencies, setallCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState({});
  const [firstMonthPrice, setfirstMonthPrice] = useState("");
  const [monthlyPrice, setmonthlyPrice] = useState("");
  const [gracePeriod, setgracePeriod] = useState("");
  const [secondChargeAttempt, setsecondChargeAttempt] = useState("");
  const [thirdChargeAttempt, setthirdChargeAttempt] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isServicesAcc, setIsServicesAcc] = useState(false);
  const [servicesAcc, setservicesAcc] = useState([]);
  const [isProfileData, setIsProfileData] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [profileSpecalities, setprofileSpecalities] = useState([]);

  // create user profile level one
  const [createBrandProfile, setCreateBrandProfile] = useState(false);
  const [createBrandProfileStep, setCreateBrandProfileStep] = useState(1);
  const [profilePicture, setProfilePicture] = useState();
  const [fullName, setFullName] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [userName, setUserName] = useState("");
  const [country, setCountry] = useState();
  const [selectState, setSelectState] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [isloading, setIsloading] = useState(false);
  const [accStatus, setAccStatus] = useState("");
  const [hidden, setHidden] = useState(false);
  const [userNameAvailable, setUserNameAvailable] = useState(false);
  const [userNameAvailable1, setUserNameAvailable1] = useState(false);
  const [changing, setChanging] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  // edit accountant data
  const [editProfilePic, setEditProfilePic] = useState(false);
  const [editCountry, setEditCountry] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState(false);
  const [editPhoneNo, setEditPhoneNo] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editCoverPic, setEditCoverPic] = useState(false);
  const [editColorCode, setEditColorCode] = useState(false);
  const [editPartneringInstitutions, setEditPartneringInstitutions] =
    useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editSubCategory, setEditSubCategory] = useState(false);
  const [editSpecialities, setEditSpecialities] = useState(false);

  //accountant profile new values
  const [newAddress, setNewAddress] = useState();
  const [newDisplayName, setNewDisplayName] = useState();
  const [newPhoneNo, setNewPhoneNo] = useState();
  const [newDescription, setNewDescription] = useState();
  const [newColorCode, setNewColorCode] = useState();
  const [newCountry, setNewCountry] = useState();
  const [newPartneringInstitutions, setNewPartneringInstitutions] = useState();
  const [newAutoDeposit, setNewAutoDeposit] = useState();
  const [newCashBack, setNewCashBack] = useState();
  const [newCategory, setNewCategory] = useState(false);
  const [newSubCategory, setNewSubCategory] = useState();
  const [newSpecialities, setNewSpecialities] = useState(false);
  const [newCoverPic, setNewCoverPic] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState();

  // //upload part starts here

  const secret = "uyrw7826^&(896GYUFWE&*#GBjkbuaf"; // secret not to be disclosed anywhere.
  const emailDev = "rahulrajsb@outlook.com"; // email of the developer.
  const userDetails = JSON.parse(localStorage.getItem("user"));

  const uploadCoverImage = async (file) => {
    setIsUploadLoading(true);

    const fileName = `${new Date().getTime()}${file.name.substr(
      file.name.lastIndexOf(".")
    )}`;

    const formData = new FormData();
    const newfile = renameFile(file, fileName);
    formData.append("files", newfile);
    const path_inside_brain = "root/";

    const jwts = await signJwt(fileName, emailDev, secret);
    // console.log(jwts, "lkjkswedcf");
    let { data } = await axios.post(
      `https://drivetest.globalxchange.io/file/dev-upload-file?email=${emailDev}&path=${path_inside_brain}&token=${jwts}&name=${fileName}`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setCoverImageS3url(data.payload.url);
    setIsUploadLoading(false);
  };

  const signJwt = async (fileName, emailDev, secret) => {
    try {
      const jwts = await new jose.SignJWT({ name: fileName, email: emailDev })
        .setProtectedHeader({ alg: "HS512" })
        .setIssuer("gxjwtenchs512")
        .setExpirationTime("10m")
        .sign(new TextEncoder().encode(secret));
      return jwts;
    } catch (error) {
      console.log(error, "kjbedkjwebdw");
    }
  };

  function renameFile(originalFile, newName) {
    return new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
  }

  //upload end here

  const handleCategories = () => {
    setIsCatLoading(true);
    GetCategoriesAcc()
      .then((res) => {
        let result = res.data;
        if (result.status) {
          setcategoriesData(result.categories);
          setIsCatLoading(false);
        }
      })
      .catch((err) => {
        setIsCatLoading(false);
        console.log(err, "jkjkk");
        toast.error("Something Went Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const handleGetCurrencies = () => {
    setIsCurrencies(true);
    GetAllCurrencies()
      .then((res) => {
        let result = res.data;
        if (result.status) {
          setallCurrencies(result.coins);
          setIsCurrencies(false);
        }
      })
      .catch((err) => {
        console.log(err, "jkjkk");
        setIsCurrencies(false);
        toast.error("Something Went Wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  const resetpop = () => {
    setispopular(false);
    setpstep(1);
    setbillingType("");
    setselectNew("");
    setselectCategory("");
    setcategoriesData([]);
    setSearch("");
    setSelectedCurrency({});
    setServiceNameInput("");
    setServiceCodeInput("");
    setProductLabel("");
    setServiceTagline("");
    setServiceDescription("");
    setfirstMonthPrice("");
    setmonthlyPrice("");
    setgracePeriod("");
    setsecondChargeAttempt("");
    setthirdChargeAttempt("");
    setfirstMonthPrice("");
    setmonthlyPrice("");
    setgracePeriod("");
    setsecondChargeAttempt("");
    setthirdChargeAttempt("");
    setCoverImageS3url("");
    setImage(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    setImage(e.target.files[0]);
    uploadCoverImage(e.target.files[0]);
  };

  const handleFinalSubmit = () => {
    setIsSubmit(true);
    let userDetails = JSON.parse(localStorage.getItem("user"));
    let objmonthly = {
      email: userDetails.user.email,
      token: userDetails.idToken,
      product_code: serviceCodeInput,
      product_name: serviceNameInput,
      product_icon: coverImageS3url,
      revenue_account: userDetails.user.email,
      client_app: "TaxChains",
      product_category_code: "CoE",
      sub_category_code: "",
      custom_product_label: productLabel,
      points_creation: false,
      sub_text: serviceTagline,
      full_description: serviceDescription,
      first_purchase: {
        price: firstMonthPrice !== "" ? parseFloat(firstMonthPrice) : 0,
        coin: selectedCurrency.coinSymbol,
      },
      billing_cycle: {
        monthly: {
          price:
            billingType === "One Time"
              ? firstMonthPrice !== ""
                ? parseFloat(firstMonthPrice)
                : 0
              : monthlyPrice !== ""
              ? parseFloat(monthlyPrice)
              : 0,
          coin: selectedCurrency.coinSymbol,
        },
      },
      grace_period:
        billingType === "One Time"
          ? 0
          : gracePeriod !== ""
          ? parseFloat(gracePeriod)
          : 0,
      first_retry:
        billingType === "One Time"
          ? 0
          : secondChargeAttempt !== ""
          ? parseFloat(secondChargeAttempt)
          : 0,
      second_retry:
        billingType === "One Time"
          ? 0
          : thirdChargeAttempt !== ""
          ? parseFloat(thirdChargeAttempt)
          : 0,
      staking_allowed: false,
      staking_details: {},
    };

    let objone = {
      email: userDetails.user.email,
      token: userDetails.idToken,
      product_code: serviceCodeInput,
      product_name: serviceNameInput,
      product_icon: coverImageS3url,
      revenue_account: userDetails.user.email,
      client_app: "TaxChains",
      product_category_code: "CoE",
      sub_category_code: "",
      custom_product_label: productLabel,
      points_creation: false,
      sub_text: serviceTagline,
      full_description: serviceDescription,
      first_purchase: {
        price: firstMonthPrice !== "" ? parseFloat(firstMonthPrice) : 0,
        coin: selectedCurrency.coinSymbol,
      },
      billing_cycle: {
        lifetime: {
          price:
            billingType === "One Time"
              ? firstMonthPrice !== ""
                ? parseFloat(firstMonthPrice)
                : 0
              : monthlyPrice !== ""
              ? parseFloat(monthlyPrice)
              : 0,
          coin: selectedCurrency.coinSymbol,
        },
      },
      grace_period:
        billingType === "One Time"
          ? 0
          : gracePeriod !== ""
          ? parseFloat(gracePeriod)
          : 0,
      first_retry:
        billingType === "One Time"
          ? 0
          : secondChargeAttempt !== ""
          ? parseFloat(secondChargeAttempt)
          : 0,
      second_retry:
        billingType === "One Time"
          ? 0
          : thirdChargeAttempt !== ""
          ? parseFloat(thirdChargeAttempt)
          : 0,
      staking_allowed: false,
      staking_details: {},
    };

    let obj = billingType === "One Time" ? objone : objmonthly;
    CreatePopularService(obj)
      .then((res) => {
        let result = res.data;
        if (result.status) {
          setpstep(7);
          setbillingType("");
          setselectNew("");
          setselectCategory("");
          setcategoriesData([]);
          setSearch("");
          setSelectedCurrency({});
          setServiceNameInput("");
          setServiceCodeInput("");
          setProductLabel("");
          setServiceTagline("");
          setServiceDescription("");
          setfirstMonthPrice("");
          setmonthlyPrice("");
          setgracePeriod("");
          setsecondChargeAttempt("");
          setthirdChargeAttempt("");
          setfirstMonthPrice("");
          setmonthlyPrice("");
          setgracePeriod("");
          setsecondChargeAttempt("");
          setthirdChargeAttempt("");
          setIsSubmit(false);
          setCoverImageS3url("");
          setImage(null);
        }
      })
      .catch((err) => {
        setIsSubmit(false);
      });
  };

  useEffect(() => {
    setsideNav("");
    resetpop();
    handleProfileData();
  }, []);

  const myTimeout1 = () => {
    setTimeout(reload1, 3000);
  };

  function reload1() {
    setCreateBrandProfile(false);
    setCreateBrandProfileStep(1);
    setProfilePicture("");
    setFullName("");
    setUserName("");
    setSelectState("");
    setCity("");
    setPhoneNo("");
    setPostalCode("");
    handleProfileData();
  }

  const handleProfileData = () => {
    let mailId = userDetails?.user?.email;
    CheckStatusNaaviProfile(mailId)
      .then((res) => {
        let result = res?.data;
        // console.log(result, 'resultttt')
        if (result?.status) {
          // console.log(result?.data)
          setIsProfileData(true);
          setProfileData(result?.data[0]);
          setprofileSpecalities(result?.data?.specialities);
        } else {
          setIsProfileData(false);
          setProfileData({});
        }
      })
      .catch((err) => {
        console.log(err, "error in handleProfileData");
      });
  };

  const levelOneProfile = () => {
    setIsLoading(true);
    let body = {
      email: userDetails?.user?.email,
      name: fullName,
      country: country,
      state: selectState,
      city: city,
      postalCode: postalCode,
      profilePicture: profilePicture,
      username: userName,
      phoneNumber: `+91${phoneNo}`,
    };

    axios
      .post(`https://careers.marketsverse.com/users/add`, body)
      .then((response) => {
        let result = response?.data;
        console.log(result, "levelOneProfile result");
        if (result?.status) {
          setIsLoading(false);
          setCreateBrandProfileStep(2);
          myTimeout1();
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "levelOneProfile error");
      });
  };

  useEffect(() => {
    accountantStatus();
  }, []);

  const accountantStatus = () => {
    let userEmail = userDetails?.user?.email;
    axios
      .get(`https://teller2.apimachine.com/admin/allBankers?email=${userEmail}`)
      .then((response) => {
        let result = response?.data?.data?.[0]?.category;
        // console.log(result, "accountantStatus result");
        if (result === "marketmakers") {
          setAccStatus("Private");
        } else if (result === "accountants") {
          setAccStatus("Public");
        }
      });
  };

  const changeStatus = (value) => {
    setChanging(true);
    let email = userDetails?.user?.email;
    let token = userDetails?.idToken;

    if (email && token) {
      axios
        .post(
          "https://teller2.apimachine.com/banker/assignCategory",
          {
            categoryName: value,
            email,
          },
          { headers: { email, token } }
        )
        .then((response) => {
          let result = response?.data;
          // console.log(result, "changeStatus result");
          if (result?.status) {
            accountantStatus();
            setChanging(false);
          } else {
            setChanging(false);
          }
        })
        .catch((error) => {
          console.log(error, "error in changeStatus");
        });
    }
  };

  // const debounce = (fn, delay) => {
  //   let timerId;
  //   return (...args) => {
  //     clearTimeout(timerId);
  //     timerId = setTimeout(() => {
  //       fn(...args);
  //     }, delay);
  //   };
  // };

  // const fetchData = debounce(async () => {
  //   const response = await fetch(
  //     `https://teller2.apimachine.com/lxUser/checkLXTag?lxTag=${userName}`
  //   );
  //   const data = await response.json();
  //   // console.log(data, "username data");
  //   if (data?.data && data?.status && userName.length < 1) {
  //     setUserNameAvailable(false);
  //   } else if (!data?.data && data?.status && userName.length > 0) {
  //     setUserNameAvailable(true);
  //   } else {
  //     setUserNameAvailable(false);
  //   }
  // }, 200);

  // useEffect(() => {
  //   fetchData();
  // }, [userName]);

  // const fetchData1 = debounce(async () => {
  //   const response = await fetch(
  //     `https://teller2.apimachine.com/lxUser/checkBankerTag?bankerTag=${brandUserName}`
  //   );
  //   const data = await response.json();
  //   // console.log(data, "username data");
  //   if (data?.data && data?.status && brandUserName.length < 1) {
  //     setUserNameAvailable1(false);
  //   } else if (!data?.data && data?.status && brandUserName.length > 0) {
  //     setUserNameAvailable1(true);
  //   } else {
  //     setUserNameAvailable1(false);
  //   }
  // }, 200);

  // useEffect(() => {
  //   fetchData1();
  // }, [brandUserName]);

  const myTimeout = () => {
    setTimeout(reload, 2000);
  };

  function reload() {
    if (editAddress) {
      setEditAddress(false);
      setNewAddress("");
    } else if (editDisplayName) {
      setEditDisplayName(false);
      setNewDisplayName("");
    } else if (editDescription) {
      setEditDescription(false);
      setNewDescription("");
    } else if (editPhoneNo) {
      setEditPhoneNo(false);
      setNewPhoneNo("");
    } else if (editColorCode) {
      setEditColorCode(false);
      setNewColorCode("");
    } else if (editCountry) {
      setEditCountry(false);
      setNewCountry("");
    }
    // else if (editPartneringInstitutions) {
    //   setEditPartneringInstitutions(false);
    //   setNewPartneringInstitutions("");
    // } else if (editCategory) {
    //   setEditCategory(false);
    //   setNewCategory("");
    // } else if (editSubCategory) {
    //   setEditSubCategory(false);
    //   setNewSubCategory("");
    // } else if (editSpecialities) {
    //   setEditSpecialities(false);
    //   setNewSpecialities("");
    // }
    else if (editCoverPic) {
      setEditCoverPic(false);
      setNewCoverPic("");
    } else if (editProfilePic) {
      setEditProfilePic(false);
      setNewProfilePic("");
    }
    handleProfileData();
  }

  const editData = async (field, value) => {
    setLoading(true);

    let body = {
      [field]: value,
    };

    let email = userDetails?.user?.email;
    let token = userDetails?.idToken;

    try {
      let result = await axios.put(
        "https://teller2.apimachine.com/lxUser/update/banker",
        body,
        {
          headers: { token, email },
        }
      );
      // console.log(result, 'editData result');
      if (result?.data?.status) {
        myTimeout();
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error, "error in editData");
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <div className="dashboard-main">
        <div className="dashboard-body">
          <div
            onClick={() => {
              setShowDrop(false);
              navigate("/dashboard/users");
            }}
          >
            <Dashsidebar />
          </div>
          <div className="dashboard-screens" onClick={() => resetpop()}>
            <div style={{ height: "100%" }}>
              <div className="dash-nav">
                <div
                  className="search-input-box"
                  onClick={() => setShowDrop(false)}
                >
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Search..."
                    // value={search}
                    // onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="search-box" onClick={() => setShowDrop(false)}>
                  <img className="search-icon" src={searchic} alt="" />
                </div>
                <div
                  className="full-user"
                  onClick={() => setShowDrop(!showDrop)}
                >
                  <div className="user-box">
                    <img
                      className="user-icon"
                      src={
                        JSON.parse(localStorage.getItem("user"))?.user
                          ?.profile_img !== undefined
                          ? JSON.parse(localStorage.getItem("user"))?.user
                              ?.profile_img
                          : profile
                      }
                      alt=""
                    />
                  </div>
                  <div
                    className="arrow-box"
                    style={{
                      transform: showDrop ? "rotate(180deg)" : "",
                      cursor: "pointer",
                    }}
                  >
                    <img className="arrow-icon" src={downarrow} alt="" />
                  </div>
                </div>
              </div>
              <>
                {isProfileData ? (
                  <div
                    className="pf-main"
                    onClick={() => setShowDrop(false)}
                    style={{ padding: "0", height: "calc(100% - 70px)" }}
                  >
                    <div className="pf-left">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: "4rem",
                          width: "100%",
                          cursor: "pointer",
                          borderBottom: "0.5px solid #E5E5E5",
                          padding: "0 35px",
                        }}
                        onClick={() => {
                          setHidden(!hidden);
                        }}
                      >
                        <div
                          style={{
                            fontSize: "17px",
                            fontWeight: "500",
                            color: "#1F304F",
                          }}
                        >
                          Naavi Profile Level 1
                        </div>
                        <div
                          style={{ transform: hidden ? "rotate(180deg)" : "" }}
                        >
                          <img src={upArrow} alt="" />
                        </div>
                      </div>

                      <div
                        style={{
                          display: hidden ? "none" : "flex",
                          flexDirection: "column",
                          padding: "0 35px",
                          width: "100%",
                          height: "calc(100% - 4rem)",
                          overflowY: "scroll",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "30px",
                            position: "relative",
                            width: "100px",
                            height: "100px",
                          }}
                        >
                          {/* <div
                            className="editIconDiv"
                            style={{ top: "-7px", right: "3px" }}
                            onClick={() => {
                              setEditProfilePic(true);
                            }}
                          >
                            <img src={edit} alt="" />
                          </div> */}
                          <img
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              border: "0.5px solid #e5e5e5",
                            }}
                            src={profileData?.profilePicture}
                            alt=""
                          />
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">Email</div>
                            <div
                              className="pfl-box-inp"
                              style={{ textTransform: "lowercase" }}
                            >
                              {profileData?.email}
                            </div>
                          </div>
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">Name</div>
                            <div className="pfl-box-inp">
                              {profileData?.name}
                            </div>
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">Username</div>
                            <div className="pfl-box-inp">
                              {profileData?.username}
                            </div>
                          </div>
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">User Type</div>
                            <div className="pfl-box-inp">
                              {profileData?.userType}
                            </div>
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">Country</div>
                            <div className="pfl-box-inp">
                              {/* <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditCountry(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div> */}
                              {profileData?.country}
                            </div>
                          </div>
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">State</div>
                            <div className="pfl-box-inp">
                              {/* <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditAddress(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div> */}
                              <span>{profileData?.state}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">City</div>
                            <div className="pfl-box-inp">
                              {/* <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditCountry(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div> */}
                              {profileData?.city}
                            </div>
                          </div>
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">Postal Code</div>
                            <div className="pfl-box-inp">
                              {/* <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditAddress(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div> */}
                              <span>{profileData?.postalCode}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">Phone Number</div>
                            <div className="pfl-box-inp">
                              {/* <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditPhoneNo(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div> */}
                              {profileData?.phoneNumber}
                            </div>
                          </div>
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">Status</div>
                            <div className="pfl-box-inp">
                              {/* <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditDisplayName(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div> */}
                              {profileData?.status}
                            </div>
                          </div>
                        </div>

                        {/* <div className="pfl-box-full">
                          <div className="pfl-box-label">Description</div>
                          <div
                            className="pfl-box-inp-full"
                            style={{ borderRadius: "25px", minHeight: "10rem" }}
                          >
                            <div
                              className="editIconDiv"
                              onClick={() => {
                                setEditDescription(true);
                              }}
                            >
                              <img src={edit} alt="" />
                            </div>
                            {profileData?.description}
                          </div>
                        </div>
                        <div className="pfl-box-full">
                          <div className="pfl-box-label">Cover&nbsp;Photo</div>
                          <div
                            style={{
                              borderRadius: "25px",
                              border: "0.5px solid #e5e5e5",
                              position: "relative",
                            }}
                          >
                            <div
                              className="editIconDiv"
                              onClick={() => {
                                setEditCoverPic(true);
                              }}
                            >
                              <img src={edit} alt="" />
                            </div>
                            <img
                              style={{ width: "100%", borderRadius: "25px" }}
                              src={profileData?.coverPicURL}
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">Colour Code</div>
                            <div
                              style={{
                                justifyContent: "space-between",
                              }}
                              className="pfl-box-inp"
                            >
                              <div
                                className="editIconDiv"
                                onClick={() => {
                                  setEditColorCode(true);
                                }}
                              >
                                <img src={edit} alt="" />
                              </div>
                              <div>{profileData?.colorCode}</div>
                              <div
                                style={{
                                  background: `#${profileData?.colorCode}`,
                                  height: "100%",
                                  borderRadius: "35px",
                                  width: "20%",
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">
                              Partnering Institutions
                            </div>
                            <div className="pfl-box-inp">
                              <div className="editIconDiv">
                                <img src={edit} alt="" />
                              </div>
                              {profileData?.partneringInstitutions !==
                                undefined &&
                              profileData?.partneringInstitutions.length > 0
                                ? profileData?.partneringInstitutions[0]._id
                                : ""}
                            </div>
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div className="pfl-boxl">
                            <div className="pfl-box-label">Category</div>
                            <div className="pfl-box-inp">
                              <div className="editIconDiv">
                                <img src={edit} alt="" />
                              </div>
                              {profileData?.category}
                            </div>
                          </div>
                          <div className="pfl-boxr">
                            <div className="pfl-box-label">Sub Category</div>
                            <div className="pfl-box-inp">
                              <div className="editIconDiv">
                                <img src={edit} alt="" />
                              </div>
                              {profileData?.subCategory}
                            </div>
                          </div>
                        </div>
                        <div className="pfl-box">
                          <div
                            className="pfl-boxl"
                            style={{ position: "relative" }}
                          >
                            <div className="editIconDiv">
                              <img src={edit} alt="" />
                            </div>
                            <div className="pfl-box-label">Specialties</div>
                            <>
                              {profileSpecalities?.length > 0 ? (
                                <>
                                  {profileSpecalities?.map((each, i) => (
                                    <div key={i} className="pfl-box-inp">
                                      {each}
                                    </div>
                                  ))}
                                </>
                              ) : (
                                ""
                              )}
                            </>
                          </div>
                        </div> */}
                      </div>

                      <div
                        style={{
                          display: !hidden ? "none" : "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: "4rem",
                          width: "100%",
                          cursor: "not-allowed",
                          borderBottom: "0.5px solid #E5E5E5",
                          padding: "0 35px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "17px",
                            fontWeight: "500",
                            color: "#1F304F",
                          }}
                        >
                          Naavi Profile Level 2
                        </div>
                        <div style={{ opacity: "0.25" }}>
                          <img src={downArrow} alt="" />
                        </div>
                      </div>

                      <div
                        style={{
                          display: !hidden ? "none" : "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          height: "4rem",
                          width: "100%",
                          cursor: "not-allowed",
                          borderBottom: "0.5px solid #E5E5E5",
                          padding: "0 35px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "17px",
                            fontWeight: "500",
                            color: "#1F304F",
                          }}
                        >
                          Naavi Profile Level 3
                        </div>
                        <div style={{ opacity: "0.25" }}>
                          <img src={downArrow} alt="" />
                        </div>
                      </div>
                    </div>
                    <div
                      className="pf-right"
                      style={{ minWidth: "30%", height: "100%" }}
                    >
                      <div className="pfr-1" style={{ padding: "0" }}>
                        <div
                          style={{
                            height: "50%",
                            borderBottom: "0.5px solid #ebebeb",
                            padding: "0 30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div className="pfr-head">Complete Level 2</div>
                          <div
                            className="pfr-btn1"
                            style={{
                              marginTop: "0",
                              color: "white",
                              background: "#59A2DD",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            Start Now
                          </div>
                        </div>
                        <div
                          style={{
                            height: "50%",
                            padding: "0 30px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                          }}
                        >
                          <div className="pfr-head">Complete Level 3</div>
                          <div
                            className="pfr-btn1"
                            style={{
                              marginTop: "0",
                              color: "white",
                              background: "#59A2DD",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                          >
                            Start Now
                          </div>
                        </div>
                      </div>
                      <div className="pfr-1">
                        <div>
                          <div className="pfr-head">Change Password</div>
                          <div className="pfr-desc">
                            Click here to change your password. You will need to
                            verify your email again to reset your password.
                          </div>
                        </div>
                        <div className="pfr-btn">Change Password</div>
                      </div>
                      <div className="pfr-2">
                        <div>
                          <div className="pfr-head">Enable 2FA</div>
                          <div className="pfr-desc">
                            For an additional layer of security you can enable 2
                            factor authentication via Google Authenticator.
                          </div>
                        </div>
                        <div className="pfr-btn">Enable</div>
                      </div>
                      {changing && (
                        <div
                          className="loading-component"
                          style={{
                            top: "70px",
                            right: "0",
                            minWidth: "calc(80vw - 56%)",
                            height: "calc(100% - 70px)",
                            position: "absolute",
                            display: "flex",
                          }}
                        >
                          <LoadingAnimation1 icon={lg1} width={200} />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div
                      className="create-acc"
                      onClick={() => {
                        setCreateBrandProfile(true);
                        setShowDrop(false);
                      }}
                    >
                      <div>Complete Your User Profile</div>
                      <div>
                        <img src={colorArrow} alt="" />
                      </div>
                    </div>
                  </>
                )}
              </>
            </div>
          </div>
        </div>
      </div>

      <>
        {ispopular ? (
          <div
            className="acc-popular"
            onClick={() => setShowDrop(false)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="acc-popular-top">
              <div className="acc-popular-head">
                {pstep > 1 ? "New Service" : "Popular Actions"}
              </div>
              <div
                className="acc-popular-img-box"
                onClick={() => resetpop()}
                style={{ cursor: "pointer" }}
              >
                <img className="acc-popular-img" src={closepop} alt="" />
              </div>
            </div>
            <>
              {pstep === 1 ? (
                <div>
                  <div className="acc-step-text">New</div>
                  <div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Service");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Service" ? "#182542" : "",
                        color: selectNew === "Service" ? "#FFF" : "",
                      }}
                    >
                      Service
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Task");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Task" ? "#182542" : "",
                        color: selectNew === "Task" ? "#FFF" : "",
                      }}
                    >
                      Task
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Article");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Article" ? "#182542" : "",
                        color: selectNew === "Article" ? "#FFF" : "",
                      }}
                    >
                      Article
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setselectNew("Video");
                        setpstep(2);
                      }}
                      style={{
                        background: selectNew === "Video" ? "#182542" : "",
                        color: selectNew === "Video" ? "#FFF" : "",
                      }}
                    >
                      Video
                    </div>
                  </div>
                </div>
              ) : pstep === 2 ? (
                <div>
                  <div className="acc-step-text">Select Billing Type</div>
                  <div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setbillingType("Monthly Subscription");
                        handleCategories();
                        setpstep(3);
                      }}
                      style={{
                        background:
                          billingType === "Monthly Subscription"
                            ? "#182542"
                            : "",
                        color:
                          billingType === "Monthly Subscription" ? "#FFF" : "",
                      }}
                    >
                      Monthly Subscription
                    </div>
                    <div
                      className="acc-step-box"
                      onClick={() => {
                        setbillingType("One Time");
                        handleCategories();
                        setpstep(3);
                      }}
                      style={{
                        background: billingType === "One Time" ? "#182542" : "",
                        color: billingType === "One Time" ? "#FFF" : "",
                      }}
                    >
                      One Time
                    </div>
                    <div
                      className="acc-step-box"
                      // onClick={() => {
                      //   setbillingType("Staking");
                      //   handleCategories();
                      //   setpstep(3);
                      // }}
                      style={{
                        opacity: "0.4",
                        cursor: "not-allowed",
                        background: billingType === "Staking" ? "#182542" : "",
                        color: billingType === "Staking" ? "#FFF" : "",
                      }}
                    >
                      Staking
                    </div>
                  </div>
                  <div
                    className="goBack"
                    onClick={() => {
                      setpstep(1);
                      setbillingType("");
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : pstep === 3 ? (
                <div>
                  <div className="acc-step-text">
                    How would you categorize this product?
                  </div>
                  <>
                    {isCatoading ? (
                      <div className="acc-step-allbox">
                        {[1, 2, 3].map((each, i) => (
                          <div className="acc-step-box">
                            <Skeleton style={{ width: "150px" }} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="acc-step-allbox">
                        {categoriesData.map((each, i) => (
                          <div
                            className="acc-step-box"
                            onClick={() => {
                              setselectCategory(each.name);
                              setpstep(4);
                            }}
                            style={{
                              background:
                                selectCategory === each.name ? "#182542" : "",
                              color: selectCategory === each.name ? "#FFF" : "",
                            }}
                          >
                            {each.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                  <div
                    className="goBack"
                    onClick={() => {
                      setpstep(2);
                      setselectCategory("");
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : pstep === 4 ? (
                <div>
                  <div className="acc-step-text">Service Information</div>
                  <div className="acc-step-allbox1">
                    <div className="acc-upload">
                      <div className="acc-upload-title">
                        Upload Profile Image
                      </div>
                      <div className="acc-upload-imgbox">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileInputChange}
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                        <img
                          className="acc-upload-img"
                          src={
                            isUploadLoading
                              ? upgif
                              : coverImageS3url !== ""
                              ? coverImageS3url
                              : uploadv
                          }
                          alt=""
                          onClick={handleImageClick}
                        />
                      </div>
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Service Name"
                        value={serviceNameInput}
                        onChange={(e) => setServiceNameInput(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Service Code"
                        value={serviceCodeInput}
                        onChange={(e) => setServiceCodeInput(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Product Label"
                        value={productLabel}
                        onChange={(e) => setProductLabel(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input"
                        type="text"
                        placeholder="Service Tagline"
                        value={serviceTagline}
                        onChange={(e) => setServiceTagline(e.target.value)}
                      />
                    </div>
                    <div className="acc-step-box1">
                      <textarea
                        className="acc-step-input1"
                        type="text"
                        placeholder="Service Description"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <div
                        className="goNext"
                        onClick={() => {
                          handleGetCurrencies();
                          setpstep(5);
                        }}
                      >
                        Next Step
                      </div>
                      <div
                        className="goBack1"
                        onClick={() => {
                          setpstep(3);
                          setServiceNameInput("");
                          setServiceCodeInput("");
                          setProductLabel("");
                          setServiceTagline("");
                          setServiceDescription("");
                          setCoverImageS3url("");
                          setImage(null);
                        }}
                      >
                        Go Back
                      </div>
                    </div>
                  </div>
                </div>
              ) : pstep === 5 ? (
                <div>
                  <div className="acc-step-text">
                    What currency do you want to collect?
                  </div>
                  <>
                    {isCurrencies ? (
                      <div className="acc-step-allbox">
                        {[1, 2, 3].map((each, i) => (
                          <div className="acc-step-box">
                            <Skeleton style={{ width: "150px" }} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="acc-step-allbox">
                        {allCurrencies.map((each, i) => (
                          <div
                            className="acc-step-box"
                            onClick={() => {
                              setSelectedCurrency(each);
                              setpstep(6);
                            }}
                            style={{
                              background:
                                selectedCurrency === each ? "#182542" : "",
                              color: selectedCurrency === each ? "#FFF" : "",
                            }}
                          >
                            {each.coinName}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                  <div
                    className="goBack"
                    onClick={() => {
                      setpstep(4);
                      setSelectedCurrency({});
                    }}
                  >
                    Go Back
                  </div>
                </div>
              ) : pstep === 6 ? (
                <div>
                  <div className="acc-step-text">Pricing Information</div>
                  <div className="acc-step-allbox1">
                    <div className="acc-step-box">
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder={
                          billingType === "One Time"
                            ? "Service Price"
                            : "First Months Price"
                        }
                        value={firstMonthPrice}
                        onChange={(e) => setfirstMonthPrice(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">
                        {selectedCurrency.coinSymbol}
                      </div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Monthly Price"
                        value={monthlyPrice}
                        onChange={(e) => setmonthlyPrice(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">
                        {selectedCurrency.coinSymbol}
                      </div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Grace Period"
                        value={gracePeriod}
                        onChange={(e) => setgracePeriod(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">Days</div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Second Charge Attempt"
                        value={secondChargeAttempt}
                        onChange={(e) => setsecondChargeAttempt(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">Days</div>
                    </div>
                    <div
                      className="acc-step-box"
                      style={{
                        display: billingType === "One Time" ? "none" : "",
                      }}
                    >
                      <input
                        className="acc-step-input2"
                        type="number"
                        placeholder="Third Charge Attempt"
                        value={thirdChargeAttempt}
                        onChange={(e) => setthirdChargeAttempt(e.target.value)}
                        onWheel={(e) => e.target.blur()}
                      />
                      <div className="acc-step-feildHead">Days</div>
                    </div>
                    <div>
                      <div
                        style={{
                          position:
                            billingType === "One Time" ? "fixed" : "initial",
                          bottom: billingType === "One Time" ? "0px" : "",
                        }}
                      >
                        <div
                          className="goNext"
                          onClick={() => {
                            handleFinalSubmit();
                          }}
                        >
                          Submit
                        </div>
                        <div
                          className="goBack1"
                          onClick={() => {
                            setpstep(5);
                            setfirstMonthPrice("");
                            setmonthlyPrice("");
                            setgracePeriod("");
                            setsecondChargeAttempt("");
                            setthirdChargeAttempt("");
                          }}
                        >
                          Go Back
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    {isSubmit ? (
                      <div className="popularlogo">
                        <img className="popularlogoimg" src={lg1} alt="" />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : pstep === 7 ? (
                <div className="success-box">
                  You Have Successfully Created A New Service
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        ) : (
          ""
        )}
      </>

      <>
        {showDrop ? (
          <div className="m-drop" onMouseDown={(e) => e.stopPropagation()}>
            {/* <div className="m-each">
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={accounts} alt="" />
                </div>
                <div className="m-left-text">Accounts</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each">
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={vaults} alt="" />
                </div>
                <div className="m-left-text">Vaults</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div> */}
            <div
              className="m-each"
              onClick={() => {
                setsideNav("");
                navigate("/");
              }}
            >
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={profilea} alt="" />
                </div>
                <div className="m-left-text">Profile</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each-line"> </div>
            <div className="m-each" style={{ opacity: "0.25" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={support} alt="" />
                </div>
                <div className="m-left-text">Support</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each" style={{ opacity: "0.25" }}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={settings} alt="" />
                </div>
                <div className="m-left-text">Settings</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
            <div className="m-each" onClick={() => handleLogout()}>
              <div className="m-left">
                <div className="m-left-icon-box">
                  <img className="m-left-icon" src={logout} alt="" />
                </div>
                <div className="m-left-text">Logout</div>
              </div>
              <div className="m-right-icon-box">
                <img className="m-right-icon" src={sidearrow} alt="" />
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>

      <>
        {createBrandProfile && (
          <div
            className="popularS"
            style={{
              padding:
                createBrandProfileStep === 2
                  ? "1rem 0rem 2rem"
                  : "1rem 3rem 2rem",
            }}
          >
            {createBrandProfileStep === 1 && (
              <>
                <div className="head-txt" style={{ height: "4rem" }}>
                  <div>Naavi Profile Level One</div>
                  <div
                    onClick={() => {
                      setCreateBrandProfile(false);
                      setUserName("");
                      setFullName("");
                      setProfilePicture("");
                      setCountry("");
                      setSelectState("");
                      setCity("");
                      setPostalCode("");
                    }}
                    className="close-div"
                  >
                    <img src={close} alt="" />
                  </div>
                </div>
                <div
                  className="overall-div"
                  style={{ height: "calc(100% - 4rem)" }}
                >
                  <div
                    style={{
                      marginBottom: "0.5rem",
                      fontSize: "1rem",
                      marginTop: "2rem",
                    }}
                  >
                    Upload Profile Picture
                  </div>
                  <ImageUploadDivProfilePic1
                    setFunc={setProfilePicture}
                    funcValue={profilePicture}
                  />
                  <InputDivsWithMT
                    heading="What is your full name?"
                    placeholderText="Name.."
                    setFunc={setFullName}
                    funcValue={fullName}
                  />
                  <InputDivsWithMT
                    heading="What is your phone number?"
                    placeholderText="+91"
                    setFunc={setPhoneNo}
                    funcValue={phoneNo}
                  />
                  <InputDivsCheckFunctionality1
                    heading="Select a username"
                    placeholderText="Username..."
                    setFunc={setUserName}
                    funcValue={userName}
                    // userNameAvailable={userNameAvailable}
                  />
                  <InputDivsWithMT
                    heading="What country are you from?"
                    placeholderText="Click here to select"
                    setFunc={setCountry}
                    funcValue={country}
                  />
                  <InputDivsWithMT
                    heading="What state are you from?"
                    placeholderText="State..."
                    setFunc={setSelectState}
                    funcValue={selectState}
                  />
                  <InputDivsWithMT
                    heading="What city are you from?"
                    placeholderText="City..."
                    setFunc={setCity}
                    funcValue={city}
                  />
                  <InputDivsWithMT
                    heading="Enter your postal code"
                    placeholderText="Postal Code..."
                    setFunc={setPostalCode}
                    funcValue={postalCode}
                  />
                  <div className="stepBtns" style={{ marginTop: "3.5rem" }}>
                    <div
                      style={{
                        background: "#1F304F",
                        width: "48%",
                        minHeight: "3.5rem",
                        maxHeight: "3.5rem",
                      }}
                      onClick={() => {
                        setCreateBrandProfile(false);
                        setUserName("");
                        setFullName("");
                        setProfilePicture("");
                        setCountry("");
                        setSelectState("");
                        setCity("");
                        setPostalCode("");
                      }}
                    >
                      Go Back
                    </div>
                    <div
                      style={{
                        minHeight: "3.5rem",
                        maxHeight: "3.5rem",
                        opacity:
                          profilePicture &&
                          fullName &&
                          userName.length > 0 &&
                          // && userNameAvailable
                          country &&
                          selectState &&
                          city &&
                          postalCode &&
                          phoneNo
                            ? "1"
                            : "0.25",
                        cursor:
                          profilePicture &&
                          fullName &&
                          userName.length > 0 &&
                          // && userNameAvailable
                          country &&
                          selectState &&
                          city &&
                          postalCode &&
                          phoneNo
                            ? "pointer"
                            : "not-allowed",
                        background: "#59A2DD",
                        width: "48%",
                      }}
                      onClick={() => {
                        if (
                          profilePicture &&
                          fullName &&
                          userName.length > 0 &&
                          // && userNameAvailable
                          country &&
                          selectState &&
                          city &&
                          postalCode &&
                          phoneNo
                        ) {
                          levelOneProfile();
                        }
                      }}
                    >
                      Next Step
                    </div>
                  </div>
                </div>
                {isloading && (
                  <div
                    className="loading-component"
                    style={{
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      display: "flex",
                    }}
                  >
                    <LoadingAnimation1 icon={lg1} width={200} />
                  </div>
                )}
              </>
            )}

            {/* {createBrandProfileStep === 2 && (
              <>
                <div
                  className="head-txt"
                  style={{ padding: "0 3rem", height: "4rem" }}
                >
                  <div>Step 2</div>
                  <div
                    onClick={() => {
                      setCreateBrandProfile(false);
                      setCreateBrandProfileStep(1);
                      setWhiteProPic("");
                      setBrandAddress("");
                      setHeadquarter("");
                      setBrandColorCode("");
                      setBrandDescription("");
                      setBrandUserName("");
                      setBrandDisplayName("");
                      setUserName("");
                      setLastName("");
                      setProfilePicture("");
                    }}
                    className="close-div"
                  >
                    <img src={close} alt="" />
                  </div>
                </div>
                <div
                  className="overall-div"
                  style={{ height: "calc(100% - 4rem)" }}
                >
                  <div className="coverPic-container">
                    <div className="coverPicDiv">
                      <ImageUploadDivCoverPic1
                        setFunc={setCoverPhoto1}
                        funcValue={coverPhoto1}
                      />
                    </div>
                    <div className="logoDiv">
                      <img
                        src={profilePicture}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          border: "none",
                        }}
                      />
                    </div>
                  </div>
                  <div className="inputs-container">
                    <InputDivsWithMT
                      heading="Display Name"
                      placeholderText="Display Name.."
                      setFunc={setBrandDisplayName}
                      funcValue={brandDisplayName}
                    />
                    <InputDivsCheckFunctionality
                      heading="Naavi Username"
                      placeholderText="Username.."
                      setFunc={setBrandUserName}
                      funcValue={brandUserName}
                      userNameAvailable={userNameAvailable1}
                    />
                    <InputDivsTextArea1
                      heading="Naavi Bio"
                      placeholderText="Bio..."
                      setFunc={setBrandDescription}
                      funcValue={brandDescription}
                    />
                    <InputDivsWithColorCode
                      heading="Colour Code"
                      placeholderText="#000000"
                      setFunc={setBrandColorCode}
                      funcValue={brandColorCode}
                      colorCode={brandColorCode}
                    />
                    <InputDivsWithMT
                      heading="What country do you practice accounting in?"
                      placeholderText="Click To Select"
                      setFunc={setHeadquarter}
                      funcValue={headquarter}
                    />
                    <InputDivsWithMT
                      heading="What is your office address?"
                      placeholderText="Enter address..."
                      setFunc={setBrandAddress}
                      funcValue={brandAddress}
                    />
                    <div
                      style={{
                        marginTop: "3rem",
                        marginBottom: "0.5rem",
                        fontSize: "1.1rem",
                      }}
                    >
                      Upload white profile picture
                    </div>
                    <ImageUploadProfilePic2
                      setFunc={setWhiteProPic}
                      funcValue={whiteProPic}
                    />
                    <div className="stepBtns" style={{ marginTop: "3.5rem" }}>
                      <div
                        style={{
                          cursor: "pointer",
                          background: "#1F304F",
                          width: "48%",
                        }}
                        onClick={() => {
                          setWhiteProPic("");
                          setBrandAddress("");
                          setHeadquarter("");
                          setBrandColorCode("");
                          setBrandDescription("");
                          setBrandUserName("");
                          setBrandDisplayName("");
                          setCoverPhoto1("");
                          setCreateBrandProfileStep(1);
                        }}
                      >
                        Go Back
                      </div>
                      <div
                        style={{
                          opacity:
                            coverPhoto1 &&
                            whiteProPic &&
                            brandAddress &&
                            headquarter &&
                            brandColorCode &&
                            brandDescription &&
                            brandUserName.length > 0 &&
                            brandDisplayName &&
                            userNameAvailable1
                              ? "1"
                              : "0.25",
                          cursor:
                            coverPhoto1 &&
                            whiteProPic &&
                            brandAddress &&
                            headquarter &&
                            brandColorCode &&
                            brandDescription &&
                            brandUserName.length > 0 &&
                            brandDisplayName &&
                            userNameAvailable1
                              ? "pointer"
                              : "not-allowed",
                          background: "#59A2DD",
                          width: "48%",
                        }}
                        onClick={() => {
                          if (
                            coverPhoto1 &&
                            whiteProPic &&
                            brandAddress &&
                            headquarter &&
                            brandColorCode &&
                            brandDescription &&
                            brandUserName.length > 0 &&
                            brandDisplayName &&
                            userNameAvailable1
                          ) {
                            createBankerProfile();
                          }
                        }}
                      >
                        Complete
                      </div>
                    </div>
                  </div>
                </div>
                {isloading && (
                  <div
                    className="loading-component"
                    style={{
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      display: "flex",
                    }}
                  >
                    <LoadingAnimation1 icon={lg1} width={200} />
                  </div>
                )}
              </>
            )} */}

            {createBrandProfileStep === 2 && (
              <div className="successMsg">
                You Have Successfully Created Your Naavi Profile.
              </div>
            )}
          </div>
        )}
      </>

      {editCountry && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Country</div>
            <div
              onClick={() => {
                setEditCountry(false);
                setNewCountry("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div className="each-action1">
              <div>{profileData?.country}</div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div className="each-action1">
              <input
                type="text"
                placeholder="New Country.."
                onChange={(e) => {
                  setNewCountry(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newCountry ? "1" : "0.25",
                cursor: newCountry ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newCountry) {
                  editData("country", newCountry);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editAddress && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Address</div>
            <div
              onClick={() => {
                setEditAddress(false);
                setNewAddress("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div className="each-action1">
              <div>{profileData?.address}</div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div className="each-action1">
              <input
                type="text"
                placeholder="New Address.."
                onChange={(e) => {
                  setNewAddress(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newAddress ? "1" : "0.25",
                cursor: newAddress ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newAddress) {
                  editData("address", newAddress);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editDisplayName && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Display Name</div>
            <div
              onClick={() => {
                setEditDisplayName(false);
                setNewDisplayName("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div className="each-action1">
              <div>{profileData?.displayName}</div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div className="each-action1">
              <input
                type="text"
                placeholder="New Display Name.."
                onChange={(e) => {
                  setNewDisplayName(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newDisplayName ? "1" : "0.25",
                cursor: newDisplayName ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newDisplayName) {
                  editData("displayName", newDisplayName);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editPhoneNo && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Phone Number</div>
            <div
              onClick={() => {
                setEditPhoneNo(false);
                setNewPhoneNo("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div className="each-action1">
              <div>{profileData?.phone}</div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div className="each-action1">
              <input
                type="number"
                placeholder="New Phone Number.."
                onChange={(e) => {
                  setNewPhoneNo(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newPhoneNo ? "1" : "0.25",
                cursor: newPhoneNo ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newPhoneNo) {
                  editData("phone", newPhoneNo);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editDescription && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Description</div>
            <div
              onClick={() => {
                setEditDescription(false);
                setNewDescription("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div className="each-action1">
              <div>{profileData?.description}</div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div className="each-action1">
              <input
                type="text"
                placeholder="New Description.."
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newDescription ? "1" : "0.25",
                cursor: newDescription ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newDescription) {
                  editData("description", newDescription);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editColorCode && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Colour Code</div>
            <div
              onClick={() => {
                setEditColorCode(false);
                setNewColorCode("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div className="each-action1" style={{ position: "relative" }}>
              <div>{profileData?.colorCode}</div>
              <div
                className="bgColorDiv"
                style={{
                  background: `#${profileData?.colorCode}`,
                }}
              ></div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div className="each-action1" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="New Colour Code.."
                onChange={(e) => {
                  setNewColorCode(e.target.value);
                }}
              />
              <div
                className="bgColorDiv"
                style={{
                  background: newColorCode ? `#${newColorCode}` : "transparent",
                }}
              ></div>
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newColorCode ? "1" : "0.25",
                cursor: newColorCode ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newColorCode) {
                  editData("colorCode", newColorCode);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editProfilePic && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Profile Picture</div>
            <div
              onClick={() => {
                setEditProfilePic(false);
                setNewProfilePic("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div
              className="each-action1"
              style={{ border: "none", justifyContent: "center" }}
            >
              <div style={{ height: "120px", width: "120px" }}>
                <img
                  src={profileData?.profilePicURL}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "50%",
                    border: "0.5px solid #e5e5e5",
                  }}
                />
              </div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div
              className="each-action1"
              style={{ border: "none", justifyContent: "center" }}
            >
              <ImageUploadDivProfilePic
                setFunc={setNewProfilePic}
                funcValue={newProfilePic}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newProfilePic ? "1" : "0.25",
                cursor: newProfilePic ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newProfilePic) {
                  editData("profilePicURL", newProfilePic);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}

      {editCoverPic && (
        <div className="popularS">
          <div className="head-txt">
            <div>Edit Cover Photo</div>
            <div
              onClick={() => {
                setEditCoverPic(false);
                setNewCoverPic("");
              }}
              className="close-div"
            >
              <img src={close} alt="" />
            </div>
          </div>

          <div
            className="overall-div"
            style={{ height: "calc(100% - 10.5rem)" }}
          >
            <div
              className="each-action1"
              style={{ height: "12rem", padding: "0" }}
            >
              <div style={{ height: "100%", width: "100%" }}>
                <img
                  src={profileData?.coverPicURL}
                  alt=""
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
            <div className="line-container">
              <div className="linee"></div>
              <div className="new-txt">New</div>
              <div className="linee"></div>
            </div>
            <div
              className="each-action1"
              style={{ height: "12rem", padding: "0" }}
            >
              <ImageUploadDivCoverPic
                setFunc={setNewCoverPic}
                funcValue={newCoverPic}
              />
            </div>
          </div>

          <div className="stepBtns" style={{ height: "4.5rem" }}>
            <div
              style={{
                opacity: newCoverPic ? "1" : "0.25",
                cursor: newCoverPic ? "pointer" : "not-allowed",
                background: "#59A2DD",
              }}
              onClick={() => {
                if (newCoverPic) {
                  editData("coverPicURL", newCoverPic);
                }
              }}
            >
              Submit Edit
            </div>
          </div>

          {loading && (
            <div
              className="loading-component"
              style={{
                top: "0",
                right: "0",
                width: "100%",
                height: "calc(100% - 70px)",
                position: "absolute",
                display: "flex",
              }}
            >
              <LoadingAnimation1 icon={lg1} width={200} />
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default UserProfile;
