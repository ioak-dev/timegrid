import React, { useState, useEffect, useRef } from 'react';
import { newId, receiveMessage, sendMessage } from '../events/MessageService';
import './styles/OakExpansion.scss';

interface Props {
  children?: any;
  collapseOthers?: boolean;
  group: string;
  defaultSection?: boolean;
}

const OakExpansion = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [slots, setSlots] = useState<any | {}>({});
  const [instanceId, setInstanceId] = useState<any>();
  const [domElement, setDomElement] = useState<any>();

  useEffect(() => {
    setInstanceId(newId());
    if (props.collapseOthers && !props.defaultSection) {
      setIsExpanded(false);
    }
  }, []);

  useEffect(() => {
    if (instanceId) {
      receiveMessage().subscribe(message => {
        if (message.name === 'expansion-expanded') {
          console.log(props.group, instanceId, message.data.instanceId);
          if (
            message.data.group === props.group &&
            message.data.instanceId !== instanceId
          ) {
            setIsExpanded(false);
          }
        }
      });
      const dom = document.getElementsByClassName(instanceId)[0];
      setDomElement(dom);
    }
  }, [instanceId]);

  useEffect(() => {
    updateScrollHeight();
  }, [isExpanded, domElement]);

  useEffect(() => {
    initializeViews();
    updateScrollHeight();
  }, [props.children]);

  const initializeViews = () => {
    let newSlots = {};
    React.Children.toArray(props.children).forEach((node: any) => {
      newSlots = { ...newSlots, [node.props.slot]: node };
    });
    setSlots(newSlots);
  };

  const toggle = () => {
    if (props.collapseOthers && !isExpanded) {
      sendMessage('expansion-expanded', true, {
        group: props.group,
        instanceId,
      });
    }
    setIsExpanded(!isExpanded);
  };
  const updateScrollHeight = () => {
    setTimeout(() => {
      if (isExpanded && domElement) {
        domElement.style.maxHeight = `${domElement.scrollHeight}px`;
      } else if (domElement) {
        domElement.style.maxHeight = '0px';
      }
    }, 0);
  };
  return (
    <div className="expansion-section">
      <div
        className={`header ${isExpanded ? 'show' : 'hide'}`}
        onClick={toggle}
      >
        {slots.header}
      </div>
      <div
        className={`container ${
          isExpanded ? `show ${instanceId}` : `hide ${instanceId}`
        }`}
      >
        {slots.content}
      </div>
    </div>
  );
};

export default OakExpansion;
