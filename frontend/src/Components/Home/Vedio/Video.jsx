import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

function randomID(len = 5) {
  const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
  let result = '';
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getUrlParams(url = window.location.href) {
  const urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallZego() {
  const containerRef = useRef();
  const { sender_id, receiver_id } = useParams();
  const socket = io('http://localhost:1576');

  useEffect(() => {
    const myMeeting = async () => {
      const roomID = getUrlParams().get('roomID') || randomID();

      const appID = 784148882;
      const serverSecret = 'a106969631e3f2a94eeccb07989420fb';

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        sender_id || randomID(),
        sender_id || 'User'
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      const shareableLink = `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`;

      socket.emit('Accept-calling', {
        shareableLink,
        sender_id,
        receiver_id,
      });

      console.log(shareableLink)
      zp.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: shareableLink,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    };

    myMeeting();
  }, [sender_id]);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
