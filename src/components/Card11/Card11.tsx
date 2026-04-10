'use client'

import { FC, useState } from 'react'
import PostCardSaveAction from '@/components/PostCardSaveAction/PostCardSaveAction'
import CategoryBadgeList from '@/components/CategoryBadgeList/CategoryBadgeList'
import PostCardLikeAndComment from '@/components/PostCardLikeAndComment/PostCardLikeAndComment'
import PostCardMeta from '@/components/PostCardMeta/PostCardMeta'
import PostFeaturedMedia from '@/components/PostFeaturedMedia/PostFeaturedMedia'
import Link from 'next/link'
import { CommonPostCardProps } from '../Card2/Card2'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'

export interface Card11Props extends CommonPostCardProps {
  ratio?: string
  hiddenAuthor?: boolean
}

const Card11: FC<Card11Props> = ({
  className = 'h-full',
  post,
  hiddenAuthor = false,
  ratio = 'aspect-w-4 aspect-h-3',
}) => {
  const {
    title,
    date,
    categories,
    author,
    ncPostMetaData,
    commentCount,
    uri,
    databaseId,
  } = getPostDataFromPostFragment(post)

  const [isHover, setIsHover] = useState(false)

  return (
	
    <div
      className={`nc-Card11 group relative flex flex-col rounded-3xl bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* 
      edited by Terry - removed featured image ONLY for Card11

      <div
        className={`relative z-10 block w-full flex-shrink-0 overflow-hidden rounded-t-3xl ${ratio}`}
      >
        <PostFeaturedMedia post={post} isHover={isHover} />
      </div>
      */}
	
      {/* edited by Terry - fix empty href warning */}
      <Link href={uri || '#'} className="absolute inset-0"></Link>
{/* edited by Terry - fix category position (remove absolute) */}
     {/*
	 <span className="absolute inset-x-3 top-3 z-10"> 
        <CategoryBadgeList categories={categories?.nodes || []} />
      </span>
	
	<div className="px-4 pt-4">
  		<CategoryBadgeList categories={categories?.nodes || []} />
	</div>
	  */}

	{/* edited by Terry - add top border */}
      {/* <div className="flex flex-1 flex-col space-y-3 rounded-b-3xl border border-t-0 border-neutral-100 px-3.5 py-4 dark:border-neutral-800">
      */}
	{/* edited by Terry - move category into box */}
	  	<div className="mb-2">
  			<CategoryBadgeList categories={categories?.nodes || []} />
		</div>

		<div className="flex flex-1 flex-col space-y-3 rounded-3xl border border-neutral-100 px-4 py-4 dark:border-neutral-800">


	    {!hiddenAuthor ? (
          <PostCardMeta meta={{ author, date }} />
        ) : (
          <span className="text-xs text-neutral-500">{date}</span>
        )}

        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span
            dangerouslySetInnerHTML={{ __html: title }}
            className="line-clamp-2"
            title={title || ''}
          ></span>
        </h3>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2.5">
          <PostCardLikeAndComment
            commentCount={commentCount || 0}
            linkToPost={uri || ''}
            likeCount={ncPostMetaData?.likesCount || 0}
            postDatabseId={databaseId || 0}
            className="relative"
            viewCount={ncPostMetaData?.viewsCount || 0}
          />

          <PostCardSaveAction
            readingTime={ncPostMetaData?.readingTime || 1}
            postDatabseId={databaseId || 0}
            className="relative"
          />
        </div>
      </div>
    </div>
  )
}

export default Card11