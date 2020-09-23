import React, { useState, useEffect, useRef } from 'react';
import { newId, receiveMessage, sendMessage } from '../events/MessageService';
import './styles/OakAccordion.scss';

interface Props {
  children?: any;
  icon: string;
  label: string;
  collapseOthers?: boolean;
  group: string;
  defaultSection?: boolean;
}

const OakAccordion = (props: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [slots, setSlots] = useState<any | {}>({});
  const instanceId = newId();
  const [domElement, setDomElement] = useState<any>();

  useEffect(() => {
    initializeViews();
    updateScrollHeight();
  }, [props.children]);

  useEffect(() => {
    updateScrollHeight();
  }, [isExpanded, domElement]);

  useEffect(() => {
    if (props.collapseOthers && !props.defaultSection) {
      setIsExpanded(false);
    }
    const eventBus = receiveMessage().subscribe(message => {
      if (message.name === 'accordion-expanded') {
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
    updateScrollHeight();
    // console.log(instanceId);
    // dom.addEventListener('DOMNodeInserted', () => {
    //   updateScrollHeight();
    // });
  }, []);

  const initializeViews = () => {
    let newSlots = {};
    React.Children.toArray(props.children).forEach((node: any) => {
      newSlots = { ...newSlots, [node.props.slot]: node };
    });
    console.log(newSlots);
    setSlots(newSlots);
  };

  const toggle = () => {
    setIsExpanded(!isExpanded);
    if (props.collapseOthers && isExpanded) {
      sendMessage('accordion-expanded', true, {
        group: props.group,
        instanceId,
      });
    }
  };
  const updateScrollHeight = () => {
    console.log('updateScrollHeight');
    console.log(isExpanded);
    console.log(domElement);
    // setTimeout(() => {
    if (isExpanded && domElement) {
      domElement.style.maxHeight = `${domElement.scrollHeight}px`;
    } else if (domElement) {
      domElement.style.maxHeight = '0px';
    }
    // }, 0);
    // setTimeout(() => {
    //   if (isExpanded && this.$refs[this.instanceId]) {
    //     this.$refs[this.instanceId].style.maxHeight =
    //       this.$refs[this.instanceId].scrollHeight + 'px';
    //   } else if (this.$refs[this.instanceId]) {
    //     this.$refs[this.instanceId].style.maxHeight = 0 + 'px';
    //   }
    // }, 0);
  };
  return (
    <div className="accordion-section">
      <div
        className={`header typography-3 ${isExpanded ? 'show' : 'hide'}`}
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

export default OakAccordion;
