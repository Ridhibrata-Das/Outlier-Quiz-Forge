"use client"
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withTranslation } from 'react-i18next'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import { easeQuadInOut } from 'd3-ease'
import AnimatedProgressProvider from 'src/utils/AnimatedProgressProvider'
import 'react-circular-progressbar/dist/styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { sysConfigdata } from 'src/store/reducers/settingsSlice'
import { imgError } from 'src/utils'
import { useRouter } from 'next/navigation'
import rightTickIcon from '../../assets/images/check-circle-score-screen.svg'
import crossIcon from '../../assets/images/x-circle-score-screen.svg'
import { getQuizEndData } from 'src/store/reducers/tempDataSlice'
import { websettingsData } from 'src/store/reducers/webSettings'
import { resetremainingSecond } from 'src/store/reducers/showRemainingSeconds'
import winnweAnimation from '../winner_animation.json'
import dynamic from 'next/dynamic'
import userImg from "src/assets/images/user.svg"

// Dynamically import Lottie with no SSR
const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false,
  loading: () => <div className="loading-placeholder" />
})

function ShowScore({
  t,
  score,
  totalQuestions,
  onPlayAgainClick,
  onReviewAnswersClick,
  onNextLevelClick,
  coins,
  showCoinandScore,
  quizScore,
  currentLevel,
  maxLevel,
  reviewAnswer,
  playAgain,
  nextlevel,
  goBack
}) {
  const [isClient, setIsClient] = useState(false)
  const navigate = useRouter()
  const percentage = (score * 100) / totalQuestions

  const websettingsdata = useSelector(websettingsData)
  const themecolor = websettingsdata && websettingsdata?.primary_color
  const remaining = useSelector(state => state.showSeconds.remainingSecond)
  const dispatch = useDispatch()

  // store data get
  const userData = useSelector(state => state.User)
  const quizEndData = useSelector(getQuizEndData)
  const systemconfig = useSelector(sysConfigdata)

  useEffect(() => {
    setIsClient(true)
    return () => {
      clear()
    }
  }, [])

  const goToHome = () => {
    navigate.push('/')
  }

  let newdata = Math.round(percentage)

  // to cleare remaining seconds
  const clear = () => {
    dispatch(resetremainingSecond(0))
  }

  // Show loading state during SSR
  if (!isClient) {
    return <div className="loading-placeholder" />
  }

  return (
    <React.Fragment>
      <div className='my-4 row d-flex align-items-center scoreUpperDiv'>
        <div className='col-md-2 col-4 coin_score_screen score-section text-center bold'>
          {percentage >= Number(systemconfig.quiz_winning_percentage) && isClient && (
            <div className='winner_image_animation'>
              <Lottie
                loop
                animationData={winnweAnimation}
                play
              />
            </div>
          )}
          <div className='d-inline-block'>
            <AnimatedProgressProvider
              valueStart={0}
              valueEnd={percentage}
              duration={0.2}
              easingFunction={easeQuadInOut}
            >
              {value => {
                return (
                  <CircularProgressbarWithChildren
                    value={newdata}
                    strokeWidth={5}
                    styles={buildStyles({
                      pathTransition: 'none',
                      textColor: themecolor,
                      trailColor: '#f5f5f8',
                      pathColor:
                        percentage >= Number(systemconfig.quiz_winning_percentage) ? '#15ad5a' : themecolor
                    })}
                  >
                    <img
                      src={userData?.data && userData?.data?.profile ? userData?.data?.profile : userImg.src}
                      alt='user'
                      className='showscore-userprofile'
                      onError={imgError}
                    />
                  </CircularProgressbarWithChildren>
                )
              }}
            </AnimatedProgressProvider>
          </div>
        </div>

        <div className='score-section text-center bold scoreText'>
          {percentage >= Number(systemconfig.quiz_winning_percentage) ? (
            <>
              <div className='col-4 col-md-2 right_wrong_screen text-center percent_value'>
                <h1 className='winlos percentage'>{newdata}%</h1>
              </div>
              <h4 className='winlos'>
                <b>{t(`wow_fantastic_job`)} <span>{t(`${userData?.data && userData?.data?.name}`)}</span></b>
              </h4>
              <h5>{t(`youve_achieved_mastery`)}</h5>
            </>
          ) : (
            <>
              <h4 className='winlos losText'>
                <b>{t(`good_effort`)} <span>{t(`${userData?.data && userData?.data?.name}`)}</span></b>
              </h4>
              <h5>{t(`keep_learning`)}</h5>
              <span className='percentage'>{newdata} %</span>
            </>
          )}
        </div>
      </div>

      <div className='my-4 align-items-center d-flex scoreCenterDiv'>
        {showCoinandScore && coins && (
          <div className="getCoins">
            <span className='numbr'>+ {coins || '0'}</span>
            <span className='text'>{t("coins")}</span>
          </div>
        )}

        <div className="rightWrongAnsDiv">
          <span className='rightAns'>
            <img src={rightTickIcon.src} alt="" />
            {quizEndData?.Correctanswer}
          </span>

          <span className='wrongAns'>
            <img src={crossIcon.src} alt="" />
            {quizEndData?.InCorrectanswer}
          </span>
        </div>

        <div className="rightWrongAnsDiv">
          <span>{remaining} <span className='time_text_class'>{t("time")}</span></span>
        </div>

        {showCoinandScore && quizScore && (
          <div className="getCoins">
            <span className='numbr'>{quizScore || '0'}</span>
            <span className='text'>{t("Score")}</span>
          </div>
        )}
      </div>

      <div className='dashoptions showScoreOptions row text-center'>
        {percentage >= Number(systemconfig.quiz_winning_percentage) && maxLevel !== String(currentLevel) && nextlevel && (
          <div className='fifty__fifty col-12 col-sm-6 col-md-3 custom-dash'>
            <button className='btn btn-primary' onClick={onNextLevelClick}>
              {`${t('next')} ${t('level')} `}
            </button>
          </div>
        )}

        {playAgain && (
          <div className='fifty__fifty col-12 col-sm-6 col-md-3 custom-dash'>
            <button className='btn btn-primary' onClick={onPlayAgainClick}>
              {t('play_again')}
            </button>
          </div>
        )}

        {reviewAnswer && (
          <div className='audience__poll col-12 col-sm-6 col-md-3 custom-dash'>
            <button className='btn btn-primary' onClick={onReviewAnswersClick}>
              {t('review_answers')}
            </button>
          </div>
        )}

        <div className='resettimer col-12 col-sm-6 col-md-3 custom-dash'>
          <button className='btn btn-primary' onClick={goBack}>
            {t('back')}
          </button>
        </div>

        <div className='skip__questions col-12 col-sm-6 col-md-3 custom-dash'>
          <button className='btn btn-primary' onClick={goToHome}>
            {t('home')}
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}

ShowScore.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  quizScore: PropTypes.number.isRequired
}

export default withTranslation()(ShowScore)
