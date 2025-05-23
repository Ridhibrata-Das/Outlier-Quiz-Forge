'use client'
import React, { useState, useEffect, Suspense } from 'react'
import toast from 'react-hot-toast'
import { withTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { imgError, isValidSlug, scrollhandler } from 'src/utils'
import { t } from 'i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  UserCoinScoreApi,
  categoriesApi,
  getusercoinsApi,
  unlockpremiumcateApi
} from 'src/store/actions/campaign'
import { selectCurrentLanguage } from 'src/store/reducers/languageSlice'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import excla from 'src/assets/images/exclamation.svg'
import { updateUserDataInfo } from 'src/store/reducers/userSlice'
import c1 from "src/assets/images/c1.svg"
const MySwal = withReactContent(Swal)
import { FiChevronRight } from 'react-icons/fi'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { reviewAnswerShowSuccess } from 'src/store/reducers/tempDataSlice'
import CategoriesComponent from 'src/components/view/common/CategoriesComponent'
import CatCompoSkeleton from 'src/components/view/common/CatCompoSkeleton'
const Layout = dynamic(() => import('src/components/Layout/Layout'), { ssr: false })

const QuizZone = () => {
  const [category, setCategory] = useState({ all: '', selected: '' })
  const selectcurrentLanguage = useSelector(selectCurrentLanguage)

  const router = useRouter();

  const dispatch = useDispatch()

  const getAllData = () => {
    setCategory([])

    // categories api
    categoriesApi({
      type: 1,
      onSuccess: response => {
        let categories = response.data
        // console.log("categoriesssss", categories)
        setCategory({ ...category, all: categories, selected: categories[0] })
      },
      onError: error => {
        setCategory("")
        toast.error(t('no_data_found'))
      }
    })
  }

  //handle category
  const handleChangeCategory = data => {
    // this is for premium category only
    if (data.has_unlocked === '0' && data.is_premium === '1') {
      getusercoinsApi({
        onSuccess: res => {
          if (Number(data.coins) > Number(res.data.coins)) {
            MySwal.fire({
              text: t("no_enough_coins"),
              icon: 'warning',
              showCancelButton: false,
              customClass: {
                confirmButton: 'Swal-confirm-buttons',
                cancelButton: "Swal-cancel-buttons"
              },
              confirmButtonText: `OK`,
              allowOutsideClick: false
            })
          } else {
            MySwal.fire({
              text: t('double_coins_achieve_higher_score'),
              icon: 'warning',
              showCancelButton: true,
              customClass: {
                confirmButton: 'Swal-confirm-buttons',
                cancelButton: "Swal-cancel-buttons"
              },
              confirmButtonText: `use ${data.coins} coins`,
              allowOutsideClick: false
            }).then(result => {
              if (result.isConfirmed) {
                unlockpremiumcateApi({
                  cat_id: data.id,
                  onSuccess: res => {
                    getAllData()
                    UserCoinScoreApi({
                      coins: '-' + data.coins,
                      title: `${t('Quiz Zone')} ${t('Premium')} ${t('Categories')}`,
                      status: '1',
                      onSuccess: response => {
                        getusercoinsApi({
                          onSuccess: responseData => {
                            updateUserDataInfo(responseData.data)
                          },
                          onError: error => {
                            console.log(error)
                          }
                        })
                      },
                      onError: error => {
                        console.log(error)
                      }
                    })
                  },
                  onError: err => console.log(err)
                })
              }
            })
          }
        },
        onError: err => {
          console.log(err)
        }
      })

    } else {
      if (data.no_of !== '0') {
        const slug = data.slug;
        if (isValidSlug(slug)) {
          router.push({
            pathname: `/quiz-zone/sub-categories/${slug}`,
          });
        } else {
          console.log('Invalid slug, not redirecting');
        }
      } else {
        const slug = data.slug;
        if (isValidSlug(slug)) {
          router.push({
            pathname: `/quiz-zone/level/${slug}`,
            query: {
              catid: slug,
              isSubcategory: 0,
              is_play: data?.is_play,
            },
          });
        } else {
          console.log('Invalid slug, not redirecting');
        }
      }
    }
    //mobile device scroll handle
    scrollhandler(500)
  }

  //truncate text
  const truncate = txtlength => (txtlength?.length > 17 ? `${txtlength.substring(0, 17)}...` : txtlength)

  useEffect(() => {
    getAllData()
    dispatch(reviewAnswerShowSuccess(false))
  }, [selectcurrentLanguage])

  return (
    <Layout>

      <Breadcrumb showBreadcrumb={true} title={t('Quiz Zone')} content={t('home')} allgames={`${t('quiz')} ${t('play')}`} />
      <div className='quizplay mb-5'>
        <div className='container'>
          <div className='row morphisam mb-5'>
            <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12'>
              <div className='left-sec'>
                {/* left category sec*/}
                <div className='bottom__left'>
                  <div className='bottom__cat__box'>
                    <ul className='inner__Cat__box'>
                      <Suspense fallback={<CatCompoSkeleton />}>
                        <CategoriesComponent category={category} handleChangeCategory={handleChangeCategory} />
                      </Suspense>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}
export default withTranslation()(QuizZone)
