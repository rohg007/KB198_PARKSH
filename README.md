# KB198_PARKSH
Evaluation Repository for Team Parksh [KB198] for SIH2020

## Description
A lot of havoc is created whenever an outbreak occurs in any area. Lots of people are infected and some have to give the toll of their life.
If we can know beforehand and take measures on a small scale, maybe we can prevent a disaster. Hence there's <b>DiseaseX</b>. <b>DiseaseX</b> is one stop unified consolidated <b>Disease Reporting System</b> that integrates the following stakeholders:
<li> Health Centers
  
   ## Web DashBoard WalkThrough
    <ol>
      <h2>Brief View of How the User navigates</h2>
        Visit https://drive.google.com/file/d/1SmojEhYE01Lty-WIEWnnhUVwQQmkQ8Pk/view?usp=sharing for viewing the walkthrough
      <h2>Notifications sent to the patients on vaccinations due date</h2>
      <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/vaccine_notifications.png" alt="Vaccine Notification" width="200" height="320">
    </ol>
  ## How to Run
    React Web Dashboard is deployed on firebase cloud and can be directly accessed by visiting https://sihfinal-23cee.web.app/
    
<li> General Public
  
## Key Features

<ol> 
  <li><h2>Human and Animal Outbreaks</h2></li>
  
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/outbreak%20circles.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/animal_outbreak_detail.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/human_outbreak_detail.png" alt="Outbreak Circles" width="200" height="320"> 

The blue circles represent animal outbreak regions here and orange circles represent human outbreak regions here. We process the data entering our databases on server side and identify outbreak regions using machine learning techniques.

  <li><h2>Outbreak Notifications</h2></li>

<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/all_notifs.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/real_time_notifs.png" alt="Outbreak Circles" width="200" height="320">

We display real-time notifications as soon as you enter any outbreak region, even if the app is not open. We use passive geofencing to serve this purpose and leverage the broadcast_reciever components of Android OS. We serve SMS, Email and Push Notifications.

<li><h2>Self-Diagnose</h2></li>
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/diagnose_question.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/diagnose_result.png" alt="Outbreak Circles" width="200" height="320"> 

We provide self-diagnosing facility where user can select certain general symptoms and recieve results according to the matching percentage of the symptoms in our database.

<li><h2>Past Outbreaks</h2></li>
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/past_outbreaks.png" alt="Outbreak Circles" width="200" height="320">

We archive the outbreaks that occured in the database before but were not present in the recent clustering. This can be used for analysis in future.

<li><h2>Closest Health Center</h2></li>
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/all_health_centers.png" alt="Outbreak Circles" width="200" height="320">

All information is sorted according to the distance from the current location which changes in real-time. Also you can directly head over to GMaps and get nearest health centers to you just by a button on <b>Locate Nearest</b>

<li><h2>Multilingual</h2></li>
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/mutli_lingual.png" alt="Outbreak Circles" width="200" height="320">

We expect maximum reachability and hence we provide support for multiple languages.

<li><h2>The only info we take</h2></li>
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/all_notifs.png" alt="Outbreak Circles" width="200" height="320">

Privacy and security is our major concern hence we take only limited details from the user that too only for notification purposes. All data resides locally and no loss of data to the public.

<li><h2>General Details</h2></li>
<img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/all_outbreaks.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/outbreak_details.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/all_diseases.png" alt="Outbreak Circles" width="200" height="320"> <img src="https://github.com/rohg007/KB198_PARKSH/blob/master/Screenshots/disease_details.png" alt="Outbreak Circles" width="200" height="320"> 

You can view all the general info such as list of all diseases and disease details. List of all outbreaks and outbreaks and outbreak details, etc.

</ol>

## How to Run

Android app can be directly installed on your phone. Visit https://github.com/rohg007/KB198_PARKSH/tree/master/apks to download the apk.
