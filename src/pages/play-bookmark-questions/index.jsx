"use client"
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import toast from 'react-hot-toast'
import { withTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { sysConfigdata } from 'src/store/reducers/settingsSlice'
import { getbookmarkApi } from 'src/store/actions/campaign'
import { useRouter } from 'next/navigation'
import Breadcrumb from 'src/components/Common/Breadcrumb'
import dynamic from 'next/dynamic'
import QuestionMiddleSectionOptions from 'src/components/view/common/QuestionMiddleSectionOptions'
import bookmarkPlayEnd from 'src/components/view/common/bookmark_play_end.json'
import Timer from 'src/components/Common/Timer'
import AudioQuestionsDashboard from 'src/components/Quiz/AudioQuestions/AudioQuestionsDashboard'
import GuessthewordQuestions from 'src/components/Quiz/Guesstheword/GuessthewordQuestions'

// Dynamically import components that use browser APIs
const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div className="loading-placeholder" />
})
const Layout = dynamic(() => import('src/components/Layout/Layout'), {
  ssr: false,
  loading: () => <div className="loading-placeholder" />
})

const BookmarkPlay = ({ t }) => {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const bookmarkId = useSelector(state => state?.Bookmark?.bookmarkId)
  const [questions, setQuestions] = useState([])
  const [showBackButton, setShowBackButton] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAns, setSelectedAns] = useState()
  const [delay, setDelay] = useState(false)
  const systemconfig = useSelector(sysConfigdata)
  const child = useRef(null)
  const TIMER_SECONDS = parseInt(systemconfig?.quiz_zone_duration || 30)

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (isClient && bookmarkId) {
      getNewQuestions()
    }
  }, [bookmarkId, isClient])

  const getNewQuestions = () => {
    if (delay && questions.length < currentQuestion) {
      setShowBackButton(true)
    } else {
      getbookmarkApi({
        type: bookmarkId,
        onSuccess: response => {
          if (response?.data) {
            let questions = response.data.map(data => ({
              ...data,
              isBookmarked: false,
              selected_answer: '',
              isAnswered: false
            }))
            setQuestions(questions)
            if (questions?.length === 0) {
              toast.error(t('no_data_found'))
              router.push('/')
            }
          }
        },
        onError: error => {
          toast.error(t('no_que_found'))
          console.error(error)
        }
      })
    }
  }

  const nextQuestion = () => {
    setTimeout(() => {
      setCurrentQuestion(currentQuestion)
      if (delay && questions.length === currentQuestion + 1) {
        setShowBackButton(true)
      }
    }, 500)

    setTimeout(() => {
      setCurrentQuestion(prev => prev + 1)
    }, 1000)
  }

  const handleAnswerOptionClick = (selAns, score) => {
    nextQuestion()
    setSelectedAns(selAns)
    if (child.current) {
      child.current.resetTimer()
    }
  }

  const onTimerExpire = () => {
    nextQuestion()
    if (child.current) {
      child.current.resetTimer()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelay(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [currentQuestion])

  const goBack = () => {
    router.push('/profile/bookmark')
  }

  const setAnswerStatusClass = option => {
    return selectedAns === option ? "bg-theme" : ""
  }

  useEffect(() => {
    return () => {
      setSelectedAns(false)
    }
  }, [currentQuestion])

  const onQuestionEnd = () => {
    setShowBackButton(true)
  }

  // Show loading state during SSR or initial client render
  if (!isClient || isLoading) {
    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row morphisam'>
            <div className='whitebackground'>
              <div className='text-center text-white'>
                <Skeleton count={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Show loading state if no bookmarkId
  if (!bookmarkId) {
    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row morphisam'>
            <div className='whitebackground'>
              <div className='text-center text-white'>
                <Skeleton count={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Breadcrumb title={t('bookmark_play')} content="" contentTwo="" />
      <div className='dashboard'>
        <div className='container'>
          <div className='row morphisam'>
            <div className='whitebackground'>
              {showBackButton ? (
                <div className='dashoptions flex-column'>
                  {isClient && (
                    <Lottie
                      loop
                      animationData={bookmarkPlayEnd}
                      play
                    />
                  )}
                  <div className='resettimer'>
                    <button className='btn' onClick={goBack}>
                      {t('Back')}
                    </button>
                  </div>
                </div>
              ) : questions?.length > 0 ? (
                <>
                  <div className="bookmark_que_index">
                    {currentQuestion + 1} - {questions?.length}
                  </div>
                  <div className='d-none'>
                    <Timer ref={child} timerSeconds={TIMER_SECONDS} onTimerExpire={onTimerExpire} />
                  </div>
                  {bookmarkId === '1' && (
                    <QuestionMiddleSectionOptions
                      questions={questions}
                      currentQuestion={currentQuestion}
                      setAnswerStatusClass={setAnswerStatusClass}
                      handleAnswerOptionClick={handleAnswerOptionClick}
                      probability={true}
                      onQuestionEnd={onQuestionEnd}
                      latex={true}
                    />
                  )}
                  {bookmarkId === '3' && (
                    <GuessthewordQuestions
                      questions={questions}
                      timerSeconds={TIMER_SECONDS}
                      onOptionClick={handleAnswerOptionClick}
                      showQuestions={false}
                      showLifeLine={false}
                      onQuestionEnd={onQuestionEnd}
                      isBookmarkPlay={true}
                    />
                  )}
                  {bookmarkId === '4' && (
                    <AudioQuestionsDashboard
                      questions={questions}
                      timerSeconds={TIMER_SECONDS}
                      onOptionClick={handleAnswerOptionClick}
                      isBookmarkPlay={true}
                      onQuestionEnd={onQuestionEnd}
                    />
                  )}
                </>
              ) : (
                <div className='text-center text-white'>
                  <Skeleton count={5} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withTranslation()(BookmarkPlay)
